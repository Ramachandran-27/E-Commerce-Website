import React from 'react';
import { Link } from 'react-router-dom';
import './WishListComponent.css';

export default function WishlistComponent({ item, onRemove }) {
  return (
    <div className="wishlist-item-card">
      <Link to={`/products/${item.product_id}`}>
        <img
          className="wishlist-item-img"
          src={process.env.REACT_APP_API_URL + item.main_image}
          alt={item.name}
        />
      </Link>
      <div className="wishlist-item-info">
        <Link to={`/products/${item.product_id}`} className="wishlist-item-title">
          {item.name}
        </Link>
        <div className="wishlist-item-price">${item.price}</div>
      </div>
      <button className="wishlist-item-remove-btn" onClick={() => onRemove(item.product_id)}>
        Remove
      </button>
    </div>
  );
}