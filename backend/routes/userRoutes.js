import express from 'express';

export default function userRoutes(userController) {
    const router = express.Router();
    // Create a new user
    router.post('/register', (req,res) => {userController.registerUser(req, res);});

    // Login a user
    router.post('/login', (req,res) => {userController.loginUser(req, res);});

    // Get user by ID
    router.get('/:id', (req,res) => {userController.getUserProfile(req, res);});

    // Update user profile
    router.put('/:id', (req,res) => {userController.updateUserProfile(req, res);});

    // Delete user
    router.delete('/:id', (req,res) => {userController.deleteUser(req, res);});
    return router;
}