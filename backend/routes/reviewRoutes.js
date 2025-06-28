import express from 'express';

export default function reviewRoutes(reviewController) {
    const router = express.Router();

    router.post('/create', (req, res) => { reviewController.createReview(req, res) });
    router.get('/user', (req, res) => { reviewController.getReviewsByUserID(req, res) });
    router.get('/:productId/average', (req, res) => { reviewController.getAverageRating(req, res) });
    router.get('/:productId', (req, res) => { reviewController.getReviewsByProductID(req, res) });
    router.put('/update/:reviewId', (req, res) => { reviewController.updateReview(req, res) });
    router.delete('/delete/:reviewId', (req, res) => { reviewController.deleteReview(req, res) });
    return router;
}