import API from "../api/axiosInstance";

export const addReview = async (reviewData) => {
    try {
        const response = await API.post('/reviews/create', reviewData);
        return response.data;
    } catch (error) {
        console.log('Error creating review:', error.message);
        throw error;
    }
}

export const getReviewsByProductId = async (productId) => {
    try {
        const response = await API.get(`/reviews/${productId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching reviews by product ID:', error.message);
        throw error;
    }
}

export const getReviewsByUserId = async (userId) => {
    try {
        const response = await API.get(`/reviews/user/${userId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching reviews by user ID:', error.message);
        throw error;
    }
}

export const getAverageRating = async (productId) => {
    try {
        const response = await API.get(`/reviews/average/${productId}`);
        return response.data;
    } catch (error) {
        console.log('Error fetching average rating:', error.message);
        throw error;
    }
}

export const updateReview = async (reviewId, reviewData) => {
    try {
        const response = await API.put(`/reviews/update/${reviewId}`, reviewData);
        return response.data;
    } catch (error) {
        console.log('Error updating review:', error.message);
        throw error;
    }
}

export const deleteReview = async (reviewId) => {
    try {
        const response = await API.delete(`/reviews/delete/${reviewId}`);
        return response.data;
    } catch (error) {
        console.log('Error deleting review:', error.message);
        throw error;
    }
}