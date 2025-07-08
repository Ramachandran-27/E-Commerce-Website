import API from "../api/axiosInstance";

export const createOrder = async (orderData) => {
    try {
        const response = await API.post('/orders/create', orderData);
        return response.data;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error;
    }
}

export const getOrderById = async (orderId) => {
    try {
        const response = await API.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw error;
    }
}

export const getOrdersByUser = async () => {
    try {
        const userId = JSON.parse(localStorage.getItem("user")).id;
        const response = await API.get(`/orders/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders by user:", error);
        throw error;
    }
}

export const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const response = await API.put(`/orders/update/${orderId}`, { newStatus });
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
}

export const deleteOrder = async (orderId) => {
    try {
        const response = await API.delete(`/orders/delete/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
}

export const checkout = async (checkoutData) => {
    try {
        const response = await API.post('/orders/checkout', checkoutData);
        return response.data;
    } catch (error) {
        console.error("Error during checkout:", error);
        throw error;
    }
}