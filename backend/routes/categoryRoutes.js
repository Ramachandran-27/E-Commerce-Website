import express from 'express';

export default function categoryRoutes(categoryController) {
    const router = express.Router();
    router.post('/create', (req, res) => { categoryController.createCategory(req, res) });
    router.get('/', (req, res) => { categoryController.getCategories(req, res) });
    router.get('/:id', (req, res) => { categoryController.getCategoryById(req, res) });
    router.get('/subcategories/:parentId', (req, res) => { categoryController.getSubCategories(req, res) });
    router.put('/update/:id', (req, res) => { categoryController.updateCategory(req, res) });
    router.delete('/delete/:id', (req, res) => { categoryController.deleteCategory(req, res) });
    return router;
}