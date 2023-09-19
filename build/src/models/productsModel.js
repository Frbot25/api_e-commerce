"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class Products {
    constructor(obj = {}) {
        for (const proname in obj) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this[proname] = obj[proname];
        }
    }
    static async findAllProducts() {
        try {
            const { rows } = await database_1.default.query(`SELECT * FROM products`);
            return rows;
        }
        catch (error) {
            console.log(error);
        }
    }
    static async findProductById(id) {
        try {
            const { rows } = await database_1.default.query(`SELECT * FROM products WHERE id=${id}`);
            return rows[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async createProduct() {
        try {
            const { rows } = await database_1.default.query(`INSERT INTO products(name, price) VALUES($1, $2) RETURNING *`, [this.name, this.price]);
            return rows[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProduct() {
        try {
            const { rows } = await database_1.default.query(`UPDATE products SET name=$1, price=$2 WHERE id=$3 RETURNING *`, [this.name, this.price, this.id]);
            return rows[0];
        }
        catch (error) {
            console.log(error);
        }
    }
    async deleteProduct() {
        try {
            const { rows } = await database_1.default.query(`DELETE FROM products WHERE id=$1 RETURNING *`, [this.id]);
            return rows[0];
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = Products;
