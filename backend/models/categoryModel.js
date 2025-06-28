class CategoryModel {
    constructor(db)
    {
        this.db = db;
    }
    async createCategory(categoryData,parentId = null) 
    {
        const query = 'INSERT INTO categories (name, parent_id) VALUES ($1,$2) RETURNING *';
        const values = [categoryData.name,parentId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async getCategories(){
        const query = 'Select * from categories';
        const res = await this.db.query(query);
        return res.rows;
    }
    async getCategoryById(categoryId){
        const query = 'Select * from categories where id=$1';
        const values = [categoryId];
        const res = await this.db.query(query, values);
        return res.rows;
    }
    async getSubCategories(parentId) {
        const query = 'SELECT * FROM categories WHERE parent_id = $1';
        const values = [parentId];
        const res = await this.db.query(query, values);
        return res.rows;
    }
    async updateCategory(categoryId, categoryData) {
        const query = 'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *';
        const values = [categoryData.name, categoryId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
    async deleteCategory(categoryId) {
        const query = 'DELETE FROM categories WHERE id = $1 RETURNING *';
        const values = [categoryId];
        const res = await this.db.query(query, values);
        return res.rows[0];
    }
}
export default CategoryModel;