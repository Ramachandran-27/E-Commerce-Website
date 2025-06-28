import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

export default function wishlistRoutes(wishlistController) {
    const router = express.Router();

    // Add a product to the wishlist
    router.post('/add', authMiddleware, (req,res) => { wishlistController.addToWishlist(req, res); });

    // Get wishlist by user ID
    router.get('/:userId', authMiddleware, (req, res) => { wishlistController.getWishlistByUserId(req, res); });

    // Remove a product from the wishlist
    router.delete('/remove', authMiddleware, (req, res) => { wishlistController.removeFromWishlist(req, res); });

    // Check if a product is in the wishlist
    router.post('/exists', authMiddleware, (req, res) => { wishlistController.isProductInWishlist(req, res); });

    return router;
}