class AddressModel {
    constructor(db) {
        this.db = db;
    }

    async addAddress(userId,addressData){
        const query = 'INSERT INTO addresses (user_id,full_name,address_line1,address_line2,city,state,postal_code,country,phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
        const values = [userId, addressData.full_name, addressData.address_line1, addressData.address_line2, addressData.city, addressData.state, addressData.postal_code, addressData.country, addressData.phone];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }

    async getAddressesByUserId(userId) {
        const query = 'SELECT * FROM addresses WHERE user_id = $1';
        const values = [userId];
        const res = await this.db.query(query, values);
        return res.rows;
    }

    async updateAddress(addressId, addressData) {
        const query = 'UPDATE addresses SET full_name = $1, address_line1 = $2, address_line2 = $3, city = $4, state = $5, postal_code = $6, country = $7, phone = $8 WHERE id = $9 RETURNING *';
        const values = [addressData.full_name, addressData.address_line1, addressData.address_line2, addressData.city, addressData.state, addressData.postal_code, addressData.country, addressData.phone, addressId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async deleteAddress(addressId) {
        const query = 'DELETE FROM addresses WHERE id = $1 RETURNING *';
        const values = [addressId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
}

export default AddressModel;