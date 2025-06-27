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
        const query = 'SELECT * FROM wishlists LEFT JOIN products ON wishlists.product_id = products.id WHERE user_id = $1';
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