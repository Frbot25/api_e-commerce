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
}
exports.default = Products;
