class ProductModel 
{
  constructor(db) 
  {
    this.db = db;
  }
  async createProduct(productData) 
  {
    const query = 'INSERT INTO products (name, description, price, stock, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [productData.name, productData.description, productData.price, productData.stock, productData.categoryId];
    const res = await this.db.query(query, values);
    return res.rows[0];
  }
  async getProductById(id) 
  {
    const query = `SELECT 
                    p.*,
                    c.name as category,
                    COALESCE(json_agg(DISTINCT jsonb_build_object('spec_key',ps.spec_key,'spec_value',ps.spec_value)) FILTER (WHERE ps.spec_key IS NOT NULL), '[]') as specifications,
                    COALESCE(json_agg(DISTINCT pi.image_url) FILTER (WHERE pi.image_url IS NOT NULL), '[]') as images,
                    (SELECT jsonb_build_object('rating', AVG(r.rating), 'count', COUNT(r.id)) FROM reviews r WHERE r.product_id = p.id) as review_summary
                    FROM products p 
                    LEFT JOIN categories c ON p.category_id = c.id 
                    LEFT JOIN product_specifications ps ON p.id = ps.product_id 
                    LEFT JOIN product_images pi ON p.id = pi.product_id 
                    WHERE p.id = $1
                    GROUP BY p.id, c.name`;
    const values = [id];
    const res = await this.db.query(query, values);
    return res.rows[0];
  }
  async getAllProducts(filters,sort,pagination){
    let query = `SELECT 
                 p.id,
                 p.name,
                 p.description,
                 p.price,
                 c.name as category,
                 (SELECT pi.image_url FROM product_images pi WHERE pi.product_id = p.id LIMIT 1) as main_image,
                 (SELECT ROUND(AVG(r.rating),1) FROM reviews r WHERE r.product_id = p.id) as average_rating
                 FROM products p
                 LEFT JOIN categories c ON p.category_id = c.id`;
    const values = [];
    const conditions = [];
    let index = 1;
    if (filters) {
      if (filters.search) {
        conditions.push(`p.name ILIKE $${index++} OR p.description ILIKE $${index++} OR c.name ILIKE $${index++}`);
        values.push(`%${filters.search}%`, `%${filters.search}%`, `%${filters.search}%`);
      }
      if (filters.categoryId) {
        conditions.push(`c.category_id = $${index++}`);
        values.push(filters.categoryId);
      }
      if (filters.minPrice) {
        conditions.push(`p.price >= $${index++}`);
        values.push(filters.minPrice);
      }
      if (filters.maxPrice) {
        conditions.push(`p.price <= $${index++}`);
        values.push(filters.maxPrice);
      }
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    if (sort) {
      query += ` ORDER BY ${sort.field} ${sort.direction}`;
    }

    if (pagination) {
      query += ` LIMIT $${index++} OFFSET $${index++}`;
      values.push(pagination.limit, pagination.offset);
    }

    const res = await this.db.query(query, values);
    return res.rows;
  }
  async updateProduct(id, productData) 
  {
    const query = 'UPDATE products SET name = $1, description = $2, price = $3, stock = $4 WHERE id = $5 RETURNING *';
    const values = [productData.name, productData.description, productData.price, productData.stock, id];
    const res = await this.db.query(query, values);
    return res.rows[0];
  }
  async deleteProduct(id) 
  {
    const query = 'DELETE FROM products WHERE id = $1 RETURNING *';
    const values = [id];
    const res = await this.db.query(query, values);
    return res.rows[0];
  }
  async getProductsByCategory(categoryId) 
  {
    const query = 'SELECT * FROM products WHERE category_id = $1';
    const values = [categoryId];
    const res = await this.db.query(query, values);
    return res.rows;
  }   
};
export default ProductModel;