import express from 'express';

export default function addressRoutes(addressController) {
    const router = express.Router();

    router.post('/add',(req,res)=>{ addressController.addAddress(req,res) });
    router.get('/user', (req, res) => { addressController.getUserAddresses(req, res) });
    router.put('/update/:id', (req, res) => { addressController.updateAddress(req, res) });
    router.delete('/delete/:id', (req, res) => { addressController.deleteAddress(req, res) });
    router.get('/:id', (req, res) => { addressController.getAddressById(req, res) });
    return router;
}