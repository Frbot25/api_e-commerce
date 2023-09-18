import client from '../database';

class Products {
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
}

export default Products;
