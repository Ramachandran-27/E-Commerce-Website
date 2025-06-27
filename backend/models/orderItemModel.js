class OrderItemModel  {
    constructor(db){
        this.db = db;
    }
    async addOrderItem(orderItem) {
        const { orderId, productId, quantity, price } = orderItem;
        const query = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING id';
        const result = await this.db.query(query, [orderId, productId, quantity, price]);
        return result.rows[0].id;
    }
    async getOrderItems(orderId){
        const query = 'Select * from order_items where order_id=$1';
        const values = [orderId];
        const result = this.db.query(query,values);
        return result.rows;
    }
}
export default OrderItemModel;