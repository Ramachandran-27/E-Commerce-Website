class ReviewController {
    constructor(ReviewModel) {
        this.ReviewModel = ReviewModel;
    }
    async createReview(req, res) {
        try {
            const { user_id,product_id, rating, comment } = req.body;
            const newReview = await this.ReviewModel.createReview(product_id, user_id, rating, comment);
            console.log(req.body);
            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create review' });
        }
    }
    async getReviewsByProductID(req, res) {
        try {
            const productId = req.params.productId; // Assuming product ID is passed as a URL parameter
            const reviews = await this.ReviewModel.getReviewsByProductID(productId);
            if (!reviews || reviews.length === 0) {
                return res.status(404).json({ error: 'No reviews found for this product' });
            }
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve reviews' });
        }
    }
    async updateReview(req, res) {
        try {
            const reviewId = req.params.reviewId; // Assuming review ID is passed as a URL parameter
            const { rating, comment } = req.body;
            const updatedReview = await this.ReviewModel.updateReview(reviewId, rating, comment);
            if (!updatedReview) {
                return res.status(404).json({ error: 'Review not found' });
            }
            res.status(200).json(updatedReview);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update review' });
        }
    }
    async getReviewsByUserID(req, res) {
        try {
            const userId = req.params.id;
            const reviews = await this.ReviewModel.getReviewsByUserID(userId);
            if (!reviews || reviews.length === 0) {
                return res.status(404).json({ error: 'No reviews found for this user' });
            }
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve reviews' });
        }
    }
    async deleteReview(req, res) {
        try {
            const reviewId = req.params.reviewId; // Assuming review ID is passed as a URL parameter
            const deletedReview = await this.ReviewModel.deleteReview(reviewId);
            if (!deletedReview) {
                return res.status(404).json({ error: 'Review not found' });
            }
            res.status(200).json(deletedReview);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete review' });
        }
    }
    async getAverageRating(req, res) {
        try {
            const productId = req.params.productId; // Assuming product ID is passed as a URL parameter
            const averageRating = await this.ReviewModel.getAverageRating(productId);
            if (averageRating === null) {
                return res.status(404).json({ error: 'No reviews found for this product' });
            }
            res.status(200).json({ averageRating });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve average rating' });
        }
    }
}

export default ReviewController;