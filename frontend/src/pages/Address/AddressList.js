import { useEffect, useState } from 'react';
import { getUserAddresses } from '../../services/addressService';
import AddressComponent from './AddressComponent';
import './AddressList.css';

export default function AddressList() {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const res = await getUserAddresses(user.id);
        setAddresses(res);
      } catch (err) {
        setAddresses([]);
      }
    };
    fetchAddresses();
  }, []);

  return (
    <div className="address-list-container">
      <h2>Your Addresses</h2>
      <div className="address-list-grid">
        {addresses.length === 0 && <div className="address-empty">No addresses found.</div>}
        {addresses.map(addr => (
          <AddressComponent key={addr.id} address={addr} />
        ))}
      </div>
    </div>
  );
}