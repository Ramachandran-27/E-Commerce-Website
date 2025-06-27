class CartModel  {
    constructor(db){
        this.db = db;
    }
    async addToCart(userId, productId, quantity) {
        const query = 'INSERT INTO cart_items (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *';
        const values = [userId, productId, quantity];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async getCartByUserId(userId) {
        const query = 'SELECT * FROM cart_items LEFT JOIN products ON cart_items.product_id = products.id WHERE user_id = $1';
        const values = [userId];
        const res = await this.db.query(query, values);
        return res.rows;
    }
    async updateCartItem(cartId, quantity) {
        const query = 'UPDATE cart_items SET quantity = $1 WHERE id = $2 RETURNING *';
        const values = [quantity, cartId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async removeFromCart(cartId,productId) {
        const query = 'DELETE FROM cart_items WHERE id = $1 AND product_id = $2 RETURNING *';
        const values = [cartId, productId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async clearCart(userId) {
        const query = 'DELETE FROM cart_items WHERE user_id = $1 RETURNING *';
        const values = [userId];
        const res = await this.db.query(query, values);
        return res.rows;
    }
}

export default CartModel;