import API from "../api/axiosInstance";

export const getAllProducts = async (params) => {
    try {
        const response = await API.get('/products',{params:params});
        console.log(process.env.REACT_APP_API_URL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log('Error fetching products:', error.message);
        throw error;
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await API.get(`/products/${productId}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.log('Error fetching product:', error.message);
        throw error;
    }
}

export const createProduct = async (productData) => {
    try {
        const formData = new FormData();
        for (const key in productData) {
            if (Array.isArray(productData[key])) {
                productData[key].forEach(item => formData.append(key, item));
            } else {
                formData.append(key, productData[key]);
            }
        }
        const response = await API.post('/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error creating product:', error.message);
        throw error;
    }
};

export const updateProduct = async (productId, productData) => {
    try {
        const formData = new FormData();
        for (const key in productData) {
            if (Array.isArray(productData[key])) {
                productData[key].forEach(item => formData.append(key, item));
            } else {
                formData.append(key, productData[key]);
            }
        }
        const response = await API.put(`/products/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error updating product:', error.message);
        throw error;
    }
};

export const updateProductImage = async (productId, imageData) => {
    try {
        const formData = new FormData();
        formData.append('image', imageData);
        const response = await API.put(`/products/images/${productId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.log('Error updating product image:', error.message);
        throw error;
    }
};

export const updateProductSpecification = async (productId, specificationData) => {
    try {
        const response = await API.put(`/products/specifications/${productId}`, specificationData);
        return response.data;
    } catch (error) {
        console.log('Error updating product specification:', error.message);
        throw error;
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await API.delete(`/products/${productId}`);
        return response.data;
    } catch (error) {
        console.log('Error deleting product:', error.message);
        throw error;
    }
};

export const deleteProductImage = async (imageId) => {
    try {
        const response = await API.delete(`/products/images/${imageId}`);
        return response.data;
    } catch (error) {
        console.log('Error deleting product image:', error.message);
        throw error;
    }
};

export const deleteProductSpecification = async (specificationId) => {
    try {
        const response = await API.delete(`/products/specifications/${specificationId}`);
        return response.data;
    } catch (error) {
        console.log('Error deleting product specification:', error.message);
        throw error;
    }
};