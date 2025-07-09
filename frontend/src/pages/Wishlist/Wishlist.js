import React, { useEffect, useState } from 'react';
import { getWishlistByUserId, removeFromWishlist } from '../../services/wishlistService';
import WishlistComponent from '../../components/WishListComponent';
import './Wishlist.css';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try{
    const response = await getWishlistByUserId();
    setWishlist(response || []);
    }catch(error){
      console.log(error.message);
      setWishlist([]);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId) => {
    try{
    const userId = JSON.parse(localStorage.getItem('user')).id;
    await removeFromWishlist(userId, productId);
    setWishlist(wishlist.filter(item => item.product_id !== productId));
    } catch(error) {
      console.log(error.message);
    }
  };

  return (
    <div className="wishlist-container">
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <div className="wishlist-empty">No items in your wishlist.</div>
      ) : (
        <div className="wishlist-list">
          {Array.isArray(wishlist) && wishlist.map(item => (
            <WishlistComponent key={item.id} item={item} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
}