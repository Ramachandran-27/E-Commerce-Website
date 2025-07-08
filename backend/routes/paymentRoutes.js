import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

export default function paymentRoutes(paymentController) {
    const router = express.Router();

    router.post('/create', authMiddleware, (req, res) => paymentController.createPayment(req, res));

    router.get('/order/:orderId', authMiddleware, (req, res) => paymentController.getPaymentsByOrderId(req, res));
    
    router.put('/update/:paymentId', authMiddleware, (req, res) => paymentController.updatePaymentStatus(req, res));
    return router;
}