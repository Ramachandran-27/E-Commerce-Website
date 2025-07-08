import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

export default function userRoutes(userController) {
    const router = express.Router();
    // Create a new user
    router.post('/register', (req,res) => {userController.registerUser(req, res);});

    // Login a user
    router.post('/login', (req,res) => {userController.loginUser(req, res);});

    // Get user by ID
    router.get('/:id',authMiddleware, (req,res) => {userController.getUserProfile(req, res);});

    // Update user profile
    router.put('/:id',authMiddleware, (req,res) => {userController.updateUserProfile(req, res);});

    // Delete user
    router.delete('/:id',authMiddleware, (req,res) => {userController.deleteUser(req, res);});

    router.get('/',authMiddleware,(req,res) => {userController.getAllUsers(req,res);})
    return router;
}