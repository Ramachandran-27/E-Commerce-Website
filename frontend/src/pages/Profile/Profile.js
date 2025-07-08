import React, { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '../../services/userService';
import { getUserAddresses, createAddress, updateAddress, deleteAddress } from '../../services/addressService';
import './Profile.css';
import '../Address/AddressList.css';
import '../Address/AddressComponent.css';

export default function Profile() {
  const [profile, setProfile] = useState({ name: '', email: '', phone: '' });
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState({ id: null, name: '', street: '', city: '', state: '', zip: '', phone: '' });
  const [addressEditMode, setAddressEditMode] = useState(false);
  const [addressMsg, setAddressMsg] = useState('');

  // Fetch profile and addresses
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const profileRes = await getUserProfile(user.id);
        setProfile(profileRes);
        const addrRes = await getUserAddresses(user.id);
        setAddresses(addrRes);
      } catch(err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  // Profile handlers
  const handleChange = (e) => setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await updateUserProfile(user.id, profile);
      setMsg('Profile updated!');
      setEdit(false);
    } catch {
      setMsg('Update failed');
    }
  };

  // Address handlers
  const handleAddressChange = (e) => setAddressForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (addressEditMode) {
        await updateAddress(addressForm.id, addressForm);
        setAddressMsg('Address updated!');
      } else {
        await createAddress({ ...addressForm, userId: user.id });
        setAddressMsg('Address added!');
      }
      // Refresh address list
      const addrRes = await getUserAddresses(user.id);
      setAddresses(addrRes);
      setAddressForm({ id: null, name: '', street: '', city: '', state: '', zip: '', phone: '' });
      setAddressEditMode(false);
    } catch {
      setAddressMsg('Failed to save address');
    }
  };

  const handleEditAddress = (addr) => {
    setAddressForm(addr);
    setAddressEditMode(true);
    setAddressMsg('');
  };

  const handleDeleteAddress = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      await deleteAddress(id);
      const addrRes = await getUserAddresses(user.id);
      setAddresses(addrRes);
      setAddressMsg('Address deleted!');
      setAddressForm({ id: null, name: '', street: '', city: '', state: '', zip: '', phone: '' });
      setAddressEditMode(false);
    } catch {
      setAddressMsg('Failed to delete address');
    }
  };

  const handleCancelEdit = () => {
    setAddressForm({ id: null, name: '', street: '', city: '', state: '', zip: '', phone: '' });
    setAddressEditMode(false);
    setAddressMsg('');
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <form className="profile-form" onSubmit={handleSave}>
        <label>Name:</label>
        <input name="name" value={profile.name} onChange={handleChange} disabled={!edit} />
        <label>Email:</label>
        <input name="email" value={profile.email} disabled />
        <div className="profile-actions">
          {edit ? (
            <button type="submit" className="profile-btn">Save</button>
          ) : (
            <button type="button" className="profile-btn" onClick={() => setEdit(true)}>Edit</button>
          )}
        </div>
        {msg && <div className="profile-msg">{msg}</div>}
      </form>

      <div className="address-section">
        <h3>Addresses</h3>
        <form className="address-form" onSubmit={handleAddressSubmit}>
          <div className="address-form-row">
            <input name="name" value={addressForm.name} onChange={handleAddressChange} placeholder="Full Name" required />
          </div>
          <input name="street" value={addressForm.street} onChange={handleAddressChange} placeholder="Street" required />
          <div className="address-form-row">
            <input name="city" value={addressForm.city} onChange={handleAddressChange} placeholder="City" required />
            <input name="state" value={addressForm.state} onChange={handleAddressChange} placeholder="State" required />
            <input name="zip" value={addressForm.zip} onChange={handleAddressChange} placeholder="ZIP" required />
          </div>
          <div className="address-form-actions">
            <button type="submit" className="profile-btn">
              {addressEditMode ? 'Update Address' : 'Add Address'}
            </button>
            {addressEditMode && (
              <button type="button" className="profile-btn cancel-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
          {addressMsg && <div className="profile-msg">{addressMsg}</div>}
        </form>
        <div className="address-list-grid">
          {addresses.length === 0 && <div className="address-empty">No addresses found.</div>}
          {addresses.map(addr => (
            <div className="address-card" key={addr.id}>
              <div className="address-info">
                <div className="address-name">{addr.name}</div>
                <div className="address-details">
                  {addr.street}, {addr.city}, {addr.state} - {addr.zip}
                </div>
                <div className="address-phone">{addr.phone}</div>
              </div>
              <div className="address-actions">
                <button className="address-edit-btn" onClick={() => handleEditAddress(addr)}>Edit</button>
                <button className="address-delete-btn" onClick={() => handleDeleteAddress(addr.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}