import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

export default function reviewRoutes(reviewController) {
    const router = express.Router();

    router.post('/create', authMiddleware, (req, res) => { reviewController.createReview(req, res) });

    router.get('/user', authMiddleware, (req, res) => { reviewController.getReviewsByUserID(req, res) });

    router.get('/:productId/average', authMiddleware, (req, res) => { reviewController.getAverageRating(req, res) });

    router.get('/:productId', authMiddleware, (req, res) => { reviewController.getReviewsByProductID(req, res) });

    router.put('/update/:reviewId', authMiddleware, (req, res) => { reviewController.updateReview(req, res) });

    router.delete('/delete/:reviewId', authMiddleware, (req, res) => { reviewController.deleteReview(req, res) });
    
    return router;
}