import client from '../database';

class Products {
  constructor(obj = {}) {
    for (const proname in obj) {
      this[proname] = obj[proname];
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
