class PaymentModel {
    constructor(db) {
        this.db = db;
    }

    async createPayment(userId, orderId, amount, paymentMethod, status) {
        const query = 'INSERT INTO payments (user_id, order_id, amount, payment_method, status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [userId, orderId, amount, paymentMethod, status];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }

    async getPaymentsByOrderId(orderId) {
        const query = 'SELECT * FROM payments WHERE order_id = $1';
        const values = [orderId];
        const res = await this.db.query(query, values);
        return res.rows;
    }
    async updatePaymentStatus(paymentId,newStatus){
        const query = 'UPDATE payments SET status = $1 WHERE id = $2 RETURNING *';
        const values = [newStatus, paymentId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
}

export default PaymentModel;
