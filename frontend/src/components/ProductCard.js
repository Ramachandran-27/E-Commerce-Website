import React from 'react';
import './ProductCard.css';
import { addToCart } from '../services/cartService';
import {Link} from 'react-router-dom'

export default function ProductCard({ details }) {
  // Helper to render stars for average rating
  const renderStars = (rating) => {
    const rounded = Math.round(rating * 2) / 2;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rounded) {
        stars.push(<span key={i} style={{ color: '#fda085' }}>★</span>);
      } else if (i - 0.5 === rounded) {
        stars.push(<span key={i} style={{ color: '#fda085' }}>☆</span>);
      } else {
        stars.push(<span key={i} style={{ color: '#e0e0e0' }}>★</span>);
      }
    }
    return stars;
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try{
    const userId = JSON.parse(localStorage.getItem('user')).id;
    const productId = details.id;
    const quantity = 1;
    const response = await addToCart({userId,productId,quantity});
    console.log(response);
    }
    catch(err){
      console.log(err.message);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${details.id}`} >
      <img
        className="product-card-img"
        src={process.env.REACT_APP_API_URL + `${details.main_image}`}
        alt={details.name}
      />
      </Link>
      <div className="product-card-body">
        <Link to={`/products/${details.id}`} >
        <div className="product-card-title">{details.name}</div>
        <div className="product-card-rating">
          {renderStars(details.average_rating || 0)}
          <span className="product-card-rating-value">
            {details.average_rating}
          </span>
        </div>
        </Link>
        <div className="product-card-desc">{details.description}</div>
        <form className="product-card-footer" onSubmit={handleAddToCart}>
          <div className="product-card-price">${details.price}</div>
          <button
            className="product-card-btn" type="submit">
            Add to Cart
          </button>
        </form>
      </div>
      
    </div>
  );
}