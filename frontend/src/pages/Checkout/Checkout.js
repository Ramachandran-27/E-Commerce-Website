import React, { useEffect, useState } from 'react';
import { getCartByUserId, clearCart } from '../../services/cartService';
import { getUserAddresses } from '../../services/addressService';
import { checkout } from '../../services/orderService';
import './Checkout.css';

export default function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchCartAndAddresses = async () => {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      const cartRes = await getCartByUserId(userId);
      setCartItems(cartRes);
      const addrRes = await getUserAddresses(userId);
      setAddresses(addrRes);
      console.log(cartRes);
      console.log(addrRes);
      if (addrRes && addrRes.length > 0) setSelectedAddress(addrRes[0].id);
    };
    fetchCartAndAddresses();
  }, []);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!selectedAddress) {
      setMsg('Please select a shipping address.');
      return;
    }
    setLoading(true);
    try {
      const userId = JSON.parse(localStorage.getItem('user')).id;
      console.log('Selected addres:',selectedAddress);
      await checkout({ userId, addressId: selectedAddress, cartItems: cartItems,paymentMethod:"Cash" });
      await clearCart(userId);
      setMsg('Order placed successfully!');
      setCartItems([]);
    } catch {
      setMsg('Order failed. Try again.');
    }
    setLoading(false);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <div className="checkout-empty">Your cart is empty.</div>
      ) : (
        <form className="checkout-form" onSubmit={handleOrder}>
          <div className="checkout-summary">
            <h3>Order Summary</h3>
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  {item.name} x {item.quantity} <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="checkout-total">
              Total: <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="checkout-address">
            <label>Shipping Address</label>
            {addresses.length === 0 ? (
              <div style={{color:'#fda085'}}>No address found. Please add one in your profile.</div>
            ) : (
              <select
                value={selectedAddress}
                onChange={e => setSelectedAddress(e.target.value)}
                required
                className="checkout-address-select"
              >
                {addresses.map(addr => (
                  <option value={addr.id} key={addr.id}>
                    {addr.name}, {addr.street}, {addr.city}, {addr.state} - {addr.zip} ({addr.phone})
                  </option>
                ))}
              </select>
            )}
          </div>
          <button className="checkout-btn" type="submit" disabled={loading || addresses.length === 0}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
          {msg && <div className="checkout-msg">{msg}</div>}
        </form>
      )}
    </div>
  );
}