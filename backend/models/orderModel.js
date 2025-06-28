class OrderModel {
    constructor(db) {
        this.db = db;
    }
    async createOrder(orderData) {
        const query = 'INSERT INTO orders (user_id,address_id,status,total_amount) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [orderData.userId, orderData.addressId, orderData.status, orderData.totalAmount];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async getOrderById(id) {
        const query = 'SELECT * FROM orders WHERE id = $1';
        const values = [id];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async getOrdersByUser(userId) {
        const query = 'SELECT * FROM orders WHERE user_id = $1';
        const values = [userId];
        const res = await this.db.query(query, values);
        return res.rows;
    }
    async updateOrderStatus(orderId, newStatus) {
        const query = 'UPDATE orders SET status = $1 WHERE id = $2 RETURNING *';
        const values = [newStatus, orderId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async deleteOrder(orderId) {
        const query = 'DELETE FROM orders WHERE id = $1 RETURNING *';
        const values = [orderId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
}
export default OrderModel;