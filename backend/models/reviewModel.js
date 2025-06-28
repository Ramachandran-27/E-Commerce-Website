class ReviewModel {
    constructor(db){
        this.db = db;
    }
    async createReview(productId, userId, rating, comment) {
        const query = 'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [productId, userId, rating, comment];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async getReviewsByProductID(productID){
        const query = 'SELECT * FROM reviews WHERE product_id = $1';
        const values = [productID];
        const res = await this.db.query(query, values);
        return res.rows;
    }
    async getReviewsByUserID(userID){
        const query = 'SELECT * FROM reviews WHERE user_id = $1';
        const values = [userID];
        const res = await this.db.query(query, values);
        return res.rows;
    }
    async getReviewsByUserIDandProductID(userID, productID){
        const query = 'SELECT * FROM reviews WHERE user_id = $1 AND product_id = $2';
        const values = [userID, productID];
        const res = await this.db.query(query, values);
        return res.rows;
    }
    async updateReview(reviewId, rating, comment) {
        const query = 'UPDATE reviews SET rating = $1, comment = $2 WHERE id = $3 RETURNING *';
        const values = [rating, comment, reviewId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async deleteReview(reviewId) {
        const query = 'DELETE FROM reviews WHERE id = $1 RETURNING *';
        const values = [reviewId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async getAverageRating(productId) {
        const query = 'SELECT AVG(rating) as average_rating FROM reviews WHERE product_id = $1';
        const values = [productId];
        const res = await this.db.query(query, values);
        return res.rows[0].average_rating;
    }
}

export default ReviewModel;