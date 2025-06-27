class ProductSpecificationsModel {
    constructor(db){
        this.db = db;
    }
    async addSpecification(productId, specification) {
        const query = 'INSERT INTO product_specifications (product_id, specification) VALUES ($1, $2) RETURNING *';
        const values = [productId, specification];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async createProductSpecifications(productId, specifications) {
        const promises = specifications.map(spec => this.addSpecification(productId, spec));
        return Promise.all(promises);
    }
    async getSpecificationsByProductId(productId) {
        const query = 'SELECT * FROM product_specifications WHERE product_id = $1';
        const values = [productId];
        const res = await this.db.query(query, values);
        return res.rows;
    }
    async updateSpecification(specificationId,spec_key,spec_value) {
        const query = 'UPDATE product_specifications SET spec_key = $1, spec_value = $2 WHERE id = $3 RETURNING *';
        const values = [spec_key, spec_value, specificationId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async deleteSpecification(specificationId) {
        const query = 'DELETE FROM product_specifications WHERE id = $1 RETURNING *';
        const values = [specificationId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
        
}
export default ProductSpecificationsModel;