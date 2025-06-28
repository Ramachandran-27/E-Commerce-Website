import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

export default function addressRoutes(addressController) {
    const router = express.Router();

    router.post('/add', authMiddleware, (req, res) => { addressController.addAddress(req, res) });

    router.get('/user', authMiddleware, (req, res) => { addressController.getUserAddresses(req, res) });

    router.put('/update/:id', authMiddleware, (req, res) => { addressController.updateAddress(req, res) });

    router.delete('/delete/:id', authMiddleware, (req, res) => { addressController.deleteAddress(req, res) });

    router.get('/:id', authMiddleware, (req, res) => { addressController.getAddressById(req, res) });
    
    return router;
}