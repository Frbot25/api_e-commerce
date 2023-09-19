"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productsModel_1 = __importDefault(require("../models/productsModel"));
const ProductController = {
    findAllProducts: async (req, res) => {
        try {
            const products = await productsModel_1.default.findAllProducts();
            res.json(products);
        }
        catch (error) {
            console.log(error);
        }
    },
    findProductById: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await productsModel_1.default.findProductById(id);
            res.json(product);
        }
        catch (error) {
            console.log(error);
        }
    },
    createProduct: async (req, res) => {
        try {
            const { name, price } = req.body;
            const product = new productsModel_1.default({ name, price });
            await product.createProduct();
            res.json(product);
        }
        catch (error) {
            console.log(error);
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const { name, price } = req.body;
            const product = await productsModel_1.default.findProductById(id);
            if (product) {
                product.name = name || product.name;
                product.price = price || product.price;
                await product.save();
                res.json(product);
            }
        }
        catch (error) {
            console.log(error);
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const product = await productsModel_1.default.findProductById(id);
            if (product) {
                await product.remove();
                res.json({ message: 'Product deleted' });
            }
        }
        catch (error) {
            console.log(error);
        }
    },
};
exports.default = ProductController;
