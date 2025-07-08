class OrderController {
    constructor(OrderModel,OrderItemModel) {
        this.OrderModel = OrderModel;
        this.OrderItemModel = OrderItemModel;
    }
    async createOrder(req, res) {
        try {
            const { userId, addressId, items, status, totalAmount } = req.body;
            const newOrder = await this.OrderModel.createOrder({ userId, addressId, status, totalAmount });
            // Create order items
            for (const item of items) {
                await this.OrderItemModel.createOrderItem({ orderId: newOrder.id, ...item });
            }
            res.status(201).json(newOrder);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create order' });
        }
    }
    async getOrderById(req, res) {
        try {
            const orderId = req.params.id; // Assuming order ID is passed as a URL parameter
            const order = await this.OrderModel.getOrderById(orderId);
            if (!order) {
                return res.status(404).json({ error: 'Order not found' });
            }
            // Fetch order items
            const orderItems = await this.OrderItemModel.getOrderItems(orderId);
            order.items = orderItems;
            res.status(200).json(order);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Failed to retrieve order' });
        }
    }
    async getOrdersByUser(req, res) {
        try {
            const userId = req.params.userId; // Assuming user ID is passed as a URL parameter
            const orders = await this.OrderModel.getOrdersByUser(userId);
            if (!orders || orders.length === 0) {
                return res.status(404).json({ error: 'No orders found for this user' });
            }
            // Fetch order items for each order
            for (const order of orders) {
                order.items = await this.OrderItemModel.getOrderItems(order.id);
            }
            res.status(200).json(orders);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve orders' });
        }
    }
    async updateOrderStatus(req, res) {
        try {
            const orderId = req.params.id; // Assuming order ID is passed as a URL parameter
            const { newStatus } = req.body;
            const updatedOrder = await this.OrderModel.updateOrderStatus(orderId, newStatus);
            if (!updatedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(updatedOrder);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update order status' });
        }
    }
    async deleteOrder(req, res) {
        try {
            const orderId = req.params.id; // Assuming order ID is passed as a URL parameter
            const deletedOrder = await this.OrderModel.deleteOrder(orderId);
            if (!deletedOrder) {
                return res.status(404).json({ error: 'Order not found' });
            }
            res.status(200).json(deletedOrder);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete order' });
        }
    }
    async checkout(req, res) {
        try {
            const { userId, addressId, cartItems, paymentMethod } = req.body;
            // Validate input
            console.log(req.body);
            if (!userId || !addressId || !cartItems || cartItems.length === 0 || !paymentMethod) {
                return res.status(400).json({ error: 'Invalid input data' });
            }
            // Calculate total amount
            let totalAmount = 0;
            let products = [];
            for (const item of cartItems) {
                if (!item.product_id || !item.quantity || !item.price) {
                    return res.status(400).json({ error: 'Invalid cart item data' });
                }
                const product = await this.OrderModel.getProductById(item.product_id);
                totalAmount += item.quantity * parseInt(product.price);
                products.push({ product_id: item.product_id, quantity: item.quantity, price: product.price });
            }
            // Create a new order
            const newOrder = await this.OrderModel.createOrder({ userId:userId, addressId:addressId, status: 'Pending', totalAmount });
            console.log(products);
            // Create order items
            for (const item of products) {
                await this.OrderItemModel.addOrderItem({ orderId: newOrder.id,product_id:item.product_id,quantity:item.quantity,price:item.price });
            }
            res.status(201).json(newOrder);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: 'Checkout failed' });
        }
    }
}

export default OrderController;