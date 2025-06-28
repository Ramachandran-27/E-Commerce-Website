import express from 'express';

export default function paymentRoutes(paymentController) {
    const router = express.Router();
    router.post('/create', (req, res) => paymentController.createPayment(req, res));
    router.get('/order/:orderId', (req, res) => paymentController.getPaymentsByOrderId(req, res));
    router.put('/update/:paymentId', (req, res) => paymentController.updatePaymentStatus(req, res));
    return router;
}