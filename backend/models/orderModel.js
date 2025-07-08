class OrderModel {
    constructor(db) {
        this.db = db;
    }
    async createOrder(orderData) {
        const query = 'INSERT INTO orders (user_id,address_id,status,total_amount) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [orderData.userId, orderData.addressId, orderData.status, orderData.totalAmount];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }

    async getProductById(id){
        const query = 'SELECT * FROM products WHERE id = $1';
        const values = [id];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async getOrderById(id) {
       const query = `
SELECT
  o.id AS order_id,
  o.user_id,
  o.total_amount,
  o.status,
  o.created_at,
  json_build_object(
    'address_line1', a.address_line1,
    'address_line2', a.address_line2,
    'city', a.city,
    'state', a.state
  ) AS address,
  json_agg(
    json_build_object(
      'product_id', p.id,
      'name', p.name,
      'description', p.description,
      'price', p.price,
      'quantity', oi.quantity
    )
  ) FILTER (WHERE p.id IS NOT NULL) AS products
FROM orders o
LEFT JOIN addresses a ON o.address_id = a.id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
WHERE o.id = $1
GROUP BY o.id, o.user_id, o.total_amount, o.status, o.created_at,
         a.address_line1, a.address_line2, a.city, a.state
`;
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