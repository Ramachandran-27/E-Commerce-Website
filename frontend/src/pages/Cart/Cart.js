import  { useEffect, useState } from 'react';
import { getCartByUserId, updateCartItem, removeFromCart, clearCart } from '../../services/cartService';
import { Link } from 'react-router-dom';
import CartItem from '../../components/CartItem';
import './Cart.css';
export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  const [total,setTotal] = useState(0);

  const fetchCart = async () => {
    try{
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const response = await getCartByUserId(userId);
    setCartItems(response);
    setTotal(response.reduce((sum, item) => sum + item.price * item.quantity, 0));
    }catch(error){
      setCartItems([]);
      setTotal(0);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleQuantityChange = async (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty < 1){ 
      const reqBody = {cartId:item.id,productId:item.product_id}
      await removeFromCart(reqBody);
      fetchCart();
      return;
     }
     const body = {cartId:item.id, quantity: newQty };
    await updateCartItem(body);
    fetchCart();
  };

  const handleDelete = async (itemId) => {
    const body = {cartId:itemId,productId:itemId};
    await removeFromCart(body);
    setCartItems(cartItems.filter((item)=>item.id!==itemId))
  };

  const handleClearCart = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    await clearCart(userId);
    fetchCart();
  };

  

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">Your cart is empty.</div>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onQuantityChange={handleQuantityChange}
                onDelete={handleDelete}
              />
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">Total: <span>${total.toFixed(2)}</span></div>
            <button className="cart-clear-btn" onClick={handleClearCart}>Clear Cart</button>
            <button className="cart-checkout-btn">
  <Link to="/checkout" style={{ color: "#fff", textDecoration: "none" }}>Checkout</Link>
</button>
          </div>
        </>
      )}
    </div>
  );
}