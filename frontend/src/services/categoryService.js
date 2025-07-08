import API from "../api/axiosInstance";

export const createCategory = async (categoryData) => {
    try {
        const response = await API.post('/category/create', categoryData);
        return response.data;
    } catch (error) {
        console.error("Error creating category:", error);
        throw error;
    }
}

export const getCategories = async () => {
    try {
        const response = await API.get('/category');
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

export const getCategoryById = async (categoryId) => {
    try {
        const response = await API.get(`/category/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw error;
    }
}

export const getSubCategories = async (parentId) => {
    try {
        const response = await API.get(`/category/subcategories/${parentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        throw error;
    }
}

export const updateCategory = async (categoryId, categoryData) => {
    try {
        const response = await API.put(`/category/update/${categoryId}`, categoryData);
        return response.data;
    } catch (error) {
        console.error("Error updating category:", error);
        throw error;
    }
}

export const deleteCategory = async (categoryId) => {
    try {
        const response = await API.delete(`/category/delete/${categoryId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting category:", error);
        throw error;
    }
}
