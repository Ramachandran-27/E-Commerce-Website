class UserModel {
  constructor(db) 
  {
    this.db = db;
  }

  async createUser(userData) 
  {
    const query = 'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *';
    const values = [userData.name, userData.email, userData.password];
    const res = await this.db.query(query, values);
    return res.rows[0];
  }

  async getUserByEmail(email) 
  {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const res = await this.db.query(query, values);
    return res.rows[0];
  }
  async getUserByUsername(username) 
  {
    const query = 'SELECT * FROM users WHERE name = $1';
    const values = [username];
    const res = await this.db.query(query, values);
    return res.rows[0];
  }
  async getUserById(id) 
  {
    const query = 'SELECT * FROM users WHERE id = $1';
    const values = [id];
    const res = await this.db.query(query, values);
    return res.rows[0];
  }
  async updateUser(id, userData) 
  {
    const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
    const values = [userData.name, userData.email, id];
    const res = await this.db.query(query, values);
    return res.rows[0];
  }
  async deleteUser(id) 
  { 
    const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
    const values = [id];
    const res = await this.db.query(query, values);
    return res.rows[0];
  }
  async getAllUsers(){
    const query = 'Select * from users';
    const res = await this.db.query(query);
    return res.rows;
  }
}

export default UserModel;