class AddressController {
    constructor(AddressModel) {
        this.AddressModel = AddressModel;
    }
    async addAddress(req, res) {
        try {
            const userId = req.user.id; // Assuming user ID is stored in req.user
            const addressData = req.body;
            const newAddress = await this.AddressModel.addAddress(userId, addressData);
            res.status(201).json(newAddress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add address' });
        }
    }
    async getUserAddresses(req, res) {
        try {
            const userId = req.user.id; // Assuming user ID is stored in req.user
            const addresses = await this.AddressModel.getAddressesByUserId(userId);
            if (!addresses || addresses.length === 0) {
                return res.status(404).json({ error: 'No addresses found for this user' });
            }
            res.status(200).json(addresses);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve addresses' });
        }
    }
    async updateAddress(req, res) {
        try {
            const addressId = req.params.id; // Assuming address ID is passed as a URL parameter
            const addressData = req.body;
            const updatedAddress = await this.AddressModel.updateAddress(addressId, addressData);
            res.status(200).json(updatedAddress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update address' });
        }
    }
    async deleteAddress(req, res) {
        try {
            const addressId = req.params.id; // Assuming address ID is passed as a URL parameter
            const deletedAddress = await this.AddressModel.deleteAddress(addressId);
            res.status(200).json(deletedAddress);
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete address' });
        }
    }
    async getAddressById(req, res) {
        try {
            const addressId = req.params.id; // Assuming address ID is passed as a URL parameter
            const address = await this.AddressModel.getAddressById(addressId);
            if (!address) {
                return res.status(404).json({ error: 'Address not found' });
            }
            res.status(200).json(address);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve address' });
        }
    }
}

export default AddressController;