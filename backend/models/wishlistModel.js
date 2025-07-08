class WishlistModel{
    constructor(db){
        this.db = db;
    }
    async addToWishlist(userId, productId) {
        const query = 'INSERT INTO wishlists (user_id, product_id) VALUES ($1, $2) RETURNING *';
        const values = [userId, productId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async getWishlistByUserId(userId){
        const query = `SELECT wishlists.*,
                 p.name,
                 p.description,
                 p.price,
                 c.name as category,
                 (SELECT pi.image_url FROM product_images pi WHERE pi.product_id = p.id LIMIT 1) as main_image,
                 (SELECT ROUND(AVG(r.rating),1) FROM reviews r WHERE r.product_id = p.id) as average_rating
                 FROM products p
                 LEFT JOIN categories c ON p.category_id = c.id  LEFT JOIN wishlists ON wishlists.product_id = p.id WHERE user_id = $1`;
        const values = [userId];
        const res = await this.db.query(query, values);
        return res.rows;
    }
    async removeFromWishlist(userId, productId) {
        const query = 'DELETE FROM wishlists WHERE user_id = $1 AND product_id = $2 RETURNING *';
        const values = [userId, productId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async isProductInWishlist(userId, productId) {
        const query = 'SELECT * FROM wishlists WHERE user_id = $1 AND product_id = $2';
        const values = [userId, productId];
        const res = await this.db.query(query, values);
        return res.rows.length > 0; // Returns true if the product is in the wishlist
    }
}

export default WishlistModel;