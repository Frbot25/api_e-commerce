import client from '../database';

class Products {
  price!: number;
  id!: string;
  name!: string;
  constructor(obj = {}) {
    for (const proname in obj) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any)[proname] = (obj as any)[proname];
    }
  }
  static async findAllProducts() {
    try {
      const { rows } = await client.query(`SELECT * FROM products`);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async findProductById(id: string) {
    try {
      const { rows } = await client.query(
        `SELECT * FROM products WHERE id=${id}`,
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async createProduct() {
    try {
      const { name, price } = this;
      const { rows } = await client.query(
        `INSERT INTO products(${name}, ${price}) VALUES($1, $2) RETURNING *`,
        [this.name, this.price],
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async updateProduct() {
    try {
      const { rows } = await client.query(
        `UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING *`,
        [this.name, this.price, this.id],
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
  async deleteProduct() {
    try {
      const { rows } = await client.query(
        `DELETE FROM products WHERE id=$1 RETURNING *`,
        [this.id],
      );
      return rows[0];
    } catch (error) {
      console.log(error);
    }
  }
}

export default Products;
