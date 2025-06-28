class PaymentController {
    constructor(PaymentModel){
        this.PaymentModel = PaymentModel;
    }

    async createPayment(req, res) {
        try {
            const { userId, orderId, amount, paymentMethod, status } = req.body;
            const newPayment = await this.PaymentModel.createPayment(userId, orderId, amount, paymentMethod, status);
            res.status(201).json(newPayment);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create payment' });
        }
    }
    async getPaymentsByOrderId(req, res) {
        try {
            const orderId = req.params.orderId; // Assuming order ID is passed as a URL parameter
            const payments = await this.PaymentModel.getPaymentsByOrderId(orderId);
            if (!payments || payments.length === 0) {
                return res.status(404).json({ error: 'No payments found for this order' });
            }
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve payments' });
        }
    }
    async updatePaymentStatus(req, res) {
        try {
            const paymentId = req.params.paymentId; // Assuming payment ID is passed as a URL parameter
            const { newStatus } = req.body;
            const updatedPayment = await this.PaymentModel.updatePaymentStatus(paymentId, newStatus);
            if (!updatedPayment) {
                return res.status(404).json({ error: 'Payment not found' });
            }
            res.status(200).json(updatedPayment);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update payment status' });
        }
    }
}

export default PaymentController;