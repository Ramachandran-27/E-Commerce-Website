import API from "../api/axiosInstance";

export const addToCart = async (cartData) => {
    try {
        const response = await API.post('/cart/add', cartData);
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
        throw error;
    }
}

export const getCartByUserId = async (userId) => {
    try {
        const response = await API.get(`/cart/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart by user ID:", error);
        throw error;
    }
}

export const updateCartItem = async (cartData) => {
    try {
        const response = await API.put(`/cart/update`, cartData);
        return response.data;
    } catch (error) {
        console.error("Error updating cart item:", error);
        throw error;
    }
}

export const removeFromCart = async (cartData) => {
    try {
        const response = await API.delete(`/cart/remove`, {data:{cartId:cartData.cartId,productId:cartData.productId }});
        return response.data;
    } catch (error) {
        console.error("Error removing item from cart:", error);
        throw error;
    }
}

export const clearCart = async (userId) => {
    try {
        const response = await API.delete(`/cart/clear/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error clearing cart:", error);
        throw error;
    }
}