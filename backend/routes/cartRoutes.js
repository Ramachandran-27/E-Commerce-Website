import express from 'express';

export default function cartRoutes(cartController) {
    const router = express.Router();

    // Add item to cart
    router.post('/add', async (req, res) => {
        await cartController.addToCart(req, res);
    });

    // Get cart by user ID
    router.get('/:userId', async (req, res) => {
        await cartController.getCartByUserId(req, res);
    });

    // Update cart item
    router.put('/update', async (req, res) => {
        await cartController.updateCartItem(req, res);
    });

    // Remove item from cart
    router.delete('/remove', async (req, res) => {
        await cartController.removeFromCart(req, res);
    });

    // Clear cart
    router.delete('/clear/:userId', async (req, res) => {
        await cartController.clearCart(req, res);
    });

    return router;
}