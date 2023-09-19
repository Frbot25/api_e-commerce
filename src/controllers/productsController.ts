import Products from '../models/productsModel';
import { Request, Response } from 'express';
const ProductController = {
  findAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await Products.findAllProducts();
      res.json(products);
    } catch (error) {
      console.log(error);
    }
  },
  findProductById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Products.findProductById(id);
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  },
  createProduct: async (req: Request, res: Response) => {
    try {
      const { name, price } = req.body;
      const product = new Products({ name, price });
      await product.createProduct();
      res.json(product);
    } catch (error) {
      console.log(error);
    }
  },
  updateProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
      const product = await Products.findProductById(id);
      if (product) {
        product.name = name || product.name;
        product.price = price || product.price;
        await product.save();
        res.json(product);
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteProduct: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Products.findProductById(id);
      if (product) {
        await product.remove();
        res.json({ message: 'Product deleted' });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default ProductController;
