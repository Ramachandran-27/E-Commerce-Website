class CategoryController {
    constructor(CategoryModel) {
        this.CategoryModel = CategoryModel;
    }
    async createCategory(req, res) {
        try {
            const categoryData = req.body;
            const parentId = req.body.parentId || null; // Optional parent ID
            const newCategory = await this.CategoryModel.createCategory(categoryData, parentId);
            res.status(201).json(newCategory);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create category' });
        }
    }
    async getCategories(req, res) {
        try {
            const categories = await this.CategoryModel.getCategories();
            if (!categories || categories.length === 0) {
                return res.status(404).json({ error: 'No categories found' });
            }
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve categories' });
        }
    }
    async getCategoryById(req, res) {
        try {
            const categoryId = req.params.id; // Assuming category ID is passed as a URL parameter
            const category = await this.CategoryModel.getCategoryById(categoryId);
            if (!category || category.length === 0) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json(category[0]);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve category' });
        }
    }
    async getSubCategories(req, res) {
        try {
            const parentId = req.params.parentId; // Assuming parent category ID is passed as a URL parameter
            const subCategories = await this.CategoryModel.getSubCategories(parentId);
            if (!subCategories || subCategories.length === 0) {
                return res.status(404).json({ error: 'No subcategories found for this category' });
            }
            res.status(200).json(subCategories);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve subcategories' });
        }
    }
    async updateCategory(req, res) {
        try {
            const categoryId = req.params.id; // Assuming category ID is passed as a URL parameter
            const categoryData = req.body;
            const updatedCategory = await this.CategoryModel.updateCategory(categoryId, categoryData);
            if (!updatedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update category' });
        }
    }
    async deleteCategory(req, res) {
        try {
            const categoryId = req.params.id; // Assuming category ID is passed as a URL parameter
            const deletedCategory = await this.CategoryModel.deleteCategory(categoryId);
            if (!deletedCategory) {
                return res.status(404).json({ error: 'Category not found' });
            }
            res.status(200).json(deletedCategory);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete category' });
        }
    }

}

export default CategoryController;