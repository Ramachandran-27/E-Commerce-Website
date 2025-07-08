import API from "../api/axiosInstance";

export const addToWishlist = async (productId) => {
    try{
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const body = {
            userId : userId,
            productId : productId
        }
        const response = await API.post('/wishlist/add',{...body});
        return response.data;
    }
    catch(error){
        console.log('Error adding to wishlist:',error.message);
        throw error;
    }
};

export const getWishlistByUserId = async () => {
    try{
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const response = await API.get(`/wishlist/${userId}`);
        return response.data;
    }
    catch(error){
        console.log('Error fetching wishlist:', error.message);
        throw error;
    }
};

export const removeFromWishlist = async (userId,productId) => {
    try{
        console.log(userId,productId);
        const response = await API.delete('/wishlist/remove', { data: {
            userId : userId,
            productId : productId
        } });
        return response.data;
    }
    catch(error){
        console.log('Error removing from wishlist:', error.message);
        throw error;
    }
};

export const isProductInWishlist = async (productId) => {
    try{
        const userId = JSON.parse(localStorage.getItem('user')).id;
        const body = {
            userId : userId,
            productId : productId
        }
        const response = await API.post('/wishlist/exists', body);
        return response.data.exists;
    }
    catch(error){
        console.log('Error checking wishlist:', error.message);
        throw error;
    }
};