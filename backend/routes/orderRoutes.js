import express from 'express';

export default function orderRoutes(orderController) {
    const router = express.Router();

    router.post('/create', (req, res) => orderController.createOrder(req, res));
    router.get('/:id', (req, res) => orderController.getOrderById(req, res));
    router.get('/user/:userId', (req, res) => orderController.getOrdersByUser(req, res));
    router.put('/update/:id', (req, res) => orderController.updateOrderStatus(req, res));
    router.delete('/delete/:id', (req, res) => orderController.deleteOrder(req, res));
    return router;
}