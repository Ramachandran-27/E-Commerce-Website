import API from "../api/axiosInstance";

export const makePayment = async (paymentData) => {
    try {
        const response = await API.post('/payments/create', paymentData);
        return response.data;
    } catch (error) {
        console.log('Error making payment:', error.message);
        throw error;
    }
}

export const getPaymentsByOrderId = async (orderId) => {
    try {
        const response = await API.get(`/payments/order/${orderId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching payments by order ID:', error.message);
        throw error;
    }
}

export const updatePaymentStatus = async (paymentId, status) => {
    try {
        const response = await API.put(`/payments/update/${paymentId}`, { status });
        return response.data;
    } catch (error) {
        console.log('Error updating payment status:', error.message);
        throw error;
    }
}