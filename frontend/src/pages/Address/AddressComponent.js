import React from 'react';
import { deleteAddress } from '../../services/addressService';
import './AddressComponent.css';

export default function AddressComponent({ address }) {
  const handleDelete = async () => {
    try {
      await deleteAddress(address.id);
      window.location.reload(); // Or use context/state for better UX
    } catch (err) {
      alert('Failed to delete address');
    }
  };

  return (
    <div className="address-card">
      <div className="address-info">
        <div className="address-name">{address.name}</div>
        <div className="address-details">
          {address.street}, {address.city}, {address.state} - {address.zip}
        </div>
        <div className="address-phone">{address.phone}</div>
      </div>
      <button className="address-delete-btn" onClick={handleDelete}>Delete</button>
    </div>
  );
}