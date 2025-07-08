import React from 'react';
import './CartItem.css';
import {Link} from 'react-router-dom';

export default function CartItem({ item, onQuantityChange, onDelete }) {
  return (
    <div className="cart-item-card">
      <img
        className="cart-item-img"
        src={process.env.REACT_APP_API_URL + item.main_image}
        alt={item.name}
      />
      <div className="cart-item-info">
        <Link to={`/products/${item.id}`} className="cart-item-title">
          {item.name}
        </Link>
        <div className="cart-item-price">${item.price}</div>
        <div className="cart-item-qty">
          <button onClick={() => onQuantityChange(item, -1)} className="qty-btn">-</button>
          <span>{item.quantity}</span>
          <button onClick={() => onQuantityChange(item, 1)} className="qty-btn">+</button>
        </div>
      </div>
      <button className="cart-item-delete-btn" onClick={() => onDelete(item.id)}>Remove</button>
    </div>
  );
}