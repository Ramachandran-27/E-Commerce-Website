import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

export default function cartRoutes(cartController) {
    const router = express.Router();

    // Add item to cart
    router.post('/add', authMiddleware, async (req, res) => { await cartController.addToCart(req, res); });

    // Get cart by user ID
    router.get('/:userId', authMiddleware, async (req, res) => { await cartController.getCartByUserId(req, res); });

    // Update cart item
    router.put('/update', authMiddleware, async (req, res) => { await cartController.updateCartItem(req, res); });

    // Remove item from cart
    router.delete('/remove', authMiddleware, async (req, res) => { await cartController.removeFromCart(req, res); });

    // Clear cart
    router.delete('/clear/:userId', authMiddleware, async (req, res) => { await cartController.clearCart(req, res); });

    return router;
}