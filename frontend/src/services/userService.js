import API from '../api/axiosInstance';

export const registerUser = async (userData) => {
    try{
        const response = await API.post('/users/register', userData);
        if(response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    }catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const loginUser = async (credentials) => {
    try{
        const response = await API.post('/users/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user',JSON.stringify(response.data.user));
        }
        return response.data;
    }
    catch(error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

export const getUserProfile = async () => {
    try{
        const userID = JSON.parse(localStorage.getItem('user')).id;
        const response = await API.get(`/users/${userID}`);
        return response.data;
    }
    catch(error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};

export const updateUserProfile = async (userData) => {
    try{
        const userID = JSON.parse(localStorage.getItem('user')).id;
        const response = await API.put(`/users/${userID}`, userData);
        return response.data;
    }
    catch(error) {
        console.error("Error updating user profile:", error);
        throw error;
    }
}

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
}

export const deleteUserAccount = async () => {
    try {
        const userID = JSON.parse(localStorage.getItem('user')).id;
        const response = await API.delete(`/users/${userID}`);
        logoutUser(); // Clear local storage on successful deletion
        return response.data;
    } catch (error) {
        console.error("Error deleting user account:", error);
        throw error;
    }
}