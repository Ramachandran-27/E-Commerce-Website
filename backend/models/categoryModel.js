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
}
export default CategoryModel;