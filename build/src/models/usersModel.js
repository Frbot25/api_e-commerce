"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class Users {
    constructor(obj = {}) {
        for (const proname in obj) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this[proname] = obj[proname];
        }
    }
    async signin() {
        try {
            console.log(this.email);
            const { rows } = await database_1.default.query(`SELECT * FROM "users" WHERE id=(SELECT id FROM "users" WHERE email = $1);`, [this.email]); //this vient du constructeur
            if (rows.length === 0) {
                throw new Error('User not found');
            }
            else {
                const userSecure = {
                    email: rows[0].email,
                    id: rows[0].id,
                    roleId: rows[0].role_id,
                };
                return userSecure;
            }
        }
        catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
    async signup() {
        try {
            const saltRounds = 10;
            const salt = await bcrypt_1.default.genSalt(saltRounds);
            const hash = await bcrypt_1.default.hash(this.password, salt);
            this.password = hash;
            const result = await database_1.default.query(`INSERT INTO "users" (email, password) VALUES ($1, $2) RETURNING *;`, [this.email, this.password]);
            if (!result.rows[0].id) {
                throw new Error('Insertion failed');
            }
            else if (result.rows[0].id) {
                return "L'utilisateur a bien été ajouté";
            }
        }
        catch (error) {
            console.log('error', error.message);
            throw new Error(error.message);
        }
    }
}
exports.default = Users;
