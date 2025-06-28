import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

export default function productRoutes(productController) {
    const router = express.Router();
    router.get('/', authMiddleware,(req, res) => {
        productController.getAllProducts(req, res);
    });

    router.get('/:id', authMiddleware, (req, res) => {
        productController.getProductById(req, res);
    });

    router.post('/', authMiddleware, (req, res) => {
        productController.createProduct(req, res);
    });

    router.put('/images/:id', authMiddleware, (req, res) => {
        productController.updateProductImage(req, res);
    });

    router.put('/specifications/:id', authMiddleware, (req, res) => {
        productController.updateProductSpecification(req, res);
    });
    router.put('/:id', authMiddleware, (req, res) => {
        productController.updateProduct(req, res);
    });
    router.delete('/:id', authMiddleware, (req, res) => {
        productController.deleteProduct(req, res);
    });
    router.delete('/images/:id', authMiddleware, (req, res) => {
        productController.deleteProductImage(req, res);
    });
    router.delete('/specifications/:id', authMiddleware, (req, res) => {
        productController.deleteProductSpecification(req, res);
    });
    return router;
}