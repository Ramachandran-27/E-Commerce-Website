import express from 'express';

export default function productRoutes(productController) {
    const router = express.Router();
    router.get('/', (req, res) => {
        productController.getAllProducts(req, res);
    });

    router.get('/:id', (req, res) => {
        productController.getProductById(req, res);
    });

    router.post('/', (req, res) => {
        productController.createProduct(req, res);
    });

    router.put('/images/:id', (req, res) => {
        productController.updateProductImage(req, res);
    });

    router.put('/specifications/:id', (req, res) => {
        productController.updateProductSpecification(req, res);
    });
    router.put('/:id', (req, res) => {
        productController.updateProduct(req, res);
    });
    router.delete('/:id', (req, res) => {
        productController.deleteProduct(req, res);
    });
    router.delete('/images/:id', (req, res) => {
        productController.deleteProductImage(req, res);
    });
    router.delete('/specifications/:id', (req, res) => {
        productController.deleteProductSpecification(req, res);
    });
    return router;
}