import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProductById } from '../../services/productService';
import { getReviewsByProductId, addReview, deleteReview } from '../../services/reviewService';
import './ProductDetails.css';
import { addToWishlist } from '../../services/wishlistService';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [myReview, setMyReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: '', comment: '' });
  const [reviewMsg, setReviewMsg] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));

  const handleAddToWishlist = async () => {
    await addToWishlist(id);
    // Optionally show a toast/notification
  };

  const fetchReviews = async () => {
    try {
      const res = await getReviewsByProductId(id);
      console.log(res);
      setReviews(res || []);
      if (user) {
        const mine = (res || []).find(r => r.user_id === user.id);
        setMyReview(mine || null);
      }
    } catch {
      setReviews([]);
      setMyReview(null);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setProduct(res);
      } catch {
        setProduct(null);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    fetchReviews();
    // eslint-disable-next-line
  }, [id]);

  const handleReviewChange = e => {
    setReviewForm({ ...reviewForm, [e.target.name]: e.target.value });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!reviewForm.rating || !reviewForm.comment) {
      setReviewMsg('Please provide both rating and comment.');
      return;
    }
    try {
      await addReview({
        product_id: id,
        user_id: user.id,
        rating: Number(reviewForm.rating),
        comment: reviewForm.comment,
      });
      setReviewForm({ rating: '', comment: '' });
      setReviewMsg('Review added!');
      fetchReviews();
    } catch {
      setReviewMsg('Failed to add review.');
    }
  };

  const handleDeleteReview = async () => {
    try {
      await deleteReview(myReview.id);
      setReviewMsg('Review deleted.');
      setMyReview(null);
      fetchReviews();
    } catch {
      setReviewMsg('Failed to delete review.');
    }
  };

  if (!product) return <div className="product-details-container">Loading...</div>;

  return (
    <div className="product-details-container">
      <div className="product-details-main-section">
        <div className="product-details-card">
          <div className="product-details-gallery">
            <img
              className="product-details-main-img"
              src={process.env.REACT_APP_API_URL + product.images[imgIdx]}
              alt={product.name}
            />
            <div className="product-details-thumbs">
              {product.images.map((img, idx) => (
                <img
                  key={img}
                  src={process.env.REACT_APP_API_URL + img}
                  alt={`thumb-${idx}`}
                  className={`product-details-thumb ${imgIdx === idx ? 'active' : ''}`}
                  onClick={() => setImgIdx(idx)}
                />
              ))}
            </div>
          </div>
          <div className="product-details-info">
            <h2>{product.name}</h2>
            <div className="product-details-category">{product.category}</div>
            <div className="product-details-rating">
              <span className="star">★</span>
              <span>{product.review_summary.rating || 0}</span>
              <span className="review-count">({product.review_summary.count} review{product.review_summary.count !== 1 ? 's' : ''})</span>
            </div>
            <div className="product-details-price">${product.price}</div>
            <div className="product-details-stock">{product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</div>
            <div className="product-details-desc">{product.description}</div>
            <div className="product-details-specs">
              <h4>Specifications</h4>
              <ul>
                {product.specifications.map((spec, idx) => (
                  <li key={idx}>
                    <span className="spec-key">{spec.spec_key}:</span> <span className="spec-value">{spec.spec_value}</span>
                  </li>
                ))}
              </ul>
            </div>
            <button className="product-details-add-btn" disabled={product.stock < 1}>
              Add to Cart
            </button>
            <button
              className="product-details-wishlist-btn"
              onClick={handleAddToWishlist}
            >
              + Add to Wishlist
            </button>
          </div>
        </div>
        <div className="product-details-reviews big-reviews-section">
          <h3>Reviews</h3>
          {user && (
            <div className="my-review-section">
              {myReview ? (
                <div className="my-review-card">
                  <div>
                    <span className="review-user">You</span>
                    <span className="review-rating">★ {myReview.rating}</span>
                  </div>
                  <div className="review-comment">{myReview.comment}</div>
                  <div className="review-date">{new Date(myReview.created_at).toLocaleDateString()}</div>
                  <button className="review-delete-btn" onClick={handleDeleteReview}>Delete My Review</button>
                </div>
              ) : (
                <form className="review-form" onSubmit={handleReviewSubmit}>
                  <label>
                    Your Rating:
                    <select
                      name="rating"
                      value={reviewForm.rating}
                      onChange={handleReviewChange}
                      required
                    >
                      <option value="">Select</option>
                      {[5,4,3,2,1].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Comment:
                    <textarea
                      name="comment"
                      value={reviewForm.comment}
                      onChange={handleReviewChange}
                      required
                    />
                  </label>
                  <button type="submit" className="review-submit-btn">Add Review</button>
                  {reviewMsg && <div className="review-msg">{reviewMsg}</div>}
                </form>
              )}
            </div>
          )}
          {reviews.length === 0 ? (
            <div className="product-details-no-reviews">No reviews yet.</div>
          ) : (
            <ul className="product-details-reviews-list">
              {reviews.map((review, idx) => (
                <li key={idx} className={`product-details-review-item${myReview && review.id === myReview.id ? ' my-review-highlight' : ''}`}>
                  <div className="review-header">
                    <span className="review-user">{review.name || 'User'}</span>
                    <span className="review-rating">★ {review.rating}</span>
                  </div>
                  <div className="review-comment">{review.comment}</div>
                  <div className="review-date">{new Date(review.created_at).toLocaleDateString()}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
    </div>
  );
}