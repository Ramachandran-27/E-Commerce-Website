import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

export default function orderRoutes(orderController) {
    const router = express.Router();

    router.post('/create', authMiddleware, (req, res) => orderController.createOrder(req, res));

    router.get('/:id', authMiddleware, (req, res) => orderController.getOrderById(req, res));

    router.get('/user/:userId', authMiddleware, (req, res) => orderController.getOrdersByUser(req, res));

    router.put('/update/:id', authMiddleware, (req, res) => orderController.updateOrderStatus(req, res));

    router.delete('/delete/:id', authMiddleware, (req, res) => orderController.deleteOrder(req, res));

    router.post('/checkout', authMiddleware, (req, res) => orderController.checkout(req, res));
    
    return router;
}