import API from "../api/axiosInstance";

export const createAddress = async (addressData) => {
    try {
        const response = await API.post('/address/add', addressData);
        return response.data;
    } catch (error) {
        console.error("Error creating address:", error);
        throw error;
    }
}

export const getUserAddresses = async () => {
    try {
        const response = await API.get('/address/user');
        return response.data;
    } catch (error) {
        console.error("Error fetching user addresses:", error);
        throw error;
    }
}

export const updateAddress = async (addressId, addressData) => {
    try {
        const response = await API.put(`/address/update/${addressId}`, addressData);
        return response.data;
    } catch (error) {
        console.error("Error updating address:", error);
        throw error;
    }
}

export const deleteAddress = async (addressId) => {
    try {
        const response = await API.delete(`/address/delete/${addressId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting address:", error);
        throw error;
    }
}

export const getAddressById = async (addressId) => {
    try {
        const response = await API.get(`/address/${addressId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching address by ID:", error);
        throw error;
    }
}