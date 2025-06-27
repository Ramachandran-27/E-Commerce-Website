class ProductImageModel {
  constructor(db) {
    this.db = db;
  }

  async addProductImage(productId,imageUrl) {
    const query = 'INSERT INTO product_images (product_id, image_url) VALUES ($1, $2) RETURNING id';
    const result = await this.db.query(query, [productId, imageUrl]);
    return result.insertId;
  }
  async createProductImages(productId, images) {
    const promises = images.map(imageUrl => this.addProductImage(productId, imageUrl));
    return Promise.all(promises);
  }
  async getProductImageById(imageId) {
    const query = 'SELECT * FROM product_images WHERE id = $1';
    const rows = await this.db.query(query, [imageId]);
    return rows[0];
  }

  async getProductImages(productId) {
    const query = 'SELECT * FROM product_images WHERE product_id = $1';
    const rows = await this.db.query(query, [productId]);
    return rows;
  }
  async deleteProductImage(imageId) {
    const query = 'DELETE FROM product_images WHERE id = ?';
    const result = await this.db.query(query, [imageId]);
    return result.affectedRows > 0;
  }
}

export default ProductImageModel;