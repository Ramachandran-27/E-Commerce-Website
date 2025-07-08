import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

export default function categoryRoutes(categoryController) {
    const router = express.Router();

    router.post('/create', authMiddleware, (req, res) => { categoryController.createCategory(req, res) });

    router.get('/', (req, res) => { categoryController.getCategories(req, res) });

    router.get('/:id', authMiddleware, (req, res) => { categoryController.getCategoryById(req, res) });

    router.get('/subcategories/:parentId', authMiddleware, (req, res) => { categoryController.getSubCategories(req, res) });

    router.put('/update/:id', authMiddleware, (req, res) => { categoryController.updateCategory(req, res) });
    
    router.delete('/delete/:id', authMiddleware, (req, res) => { categoryController.deleteCategory(req, res) });
    return router;
}