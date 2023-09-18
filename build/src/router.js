"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = require("./services/joi");
const database_1 = __importDefault(require("./database"));
const router = express_1.default.Router();
/**
 * @swagger
 * paths:
 *  /api:
 *   get:
 *     summary: Use to request home
 *     tags:
 *      - Home
 */
router.get('/', (req, res) => {
    console.log('connect ok !');
    database_1.default.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log(result.rows);
            res.send(result.rows);
        }
    });
});
/**
 * @swagger
 * paths:
 *   /api/login:
 *    post:
 *       summary: Use to login
 *       tags:
 *        - users
 *       responses:
 *         '200':
 *            description: A successful response
 *         '500':
 *           description: Internal server error
 */
router.post('/login', (req, res) => {
    try {
        const validate = (0, joi_1.validateLogin)(req.body);
        if (validate.error) {
            console.log(req.body);
            console.log(validate);
            res.status(400).json({ 'Login failed': validate.error.message });
        }
        else {
            console.log(validate);
            res.send('Login successful');
        }
    }
    catch (e) {
        console.log(e);
    }
});
/**
 * @swagger
 * paths:
 *   /api/register:
 *    post:
 *       summary: Use to register
 *       tags:
 *        - users
 *       responses:
 *         '200':
 *            description: A successful response
 *         '500':
 *           description: Internal server error
 */
router.post('/register', (req, res) => {
    try {
        const validate = (0, joi_1.validateLogin)(req.body);
        if (validate.error) {
            console.log(req.body);
            console.log(validate);
            res.status(400).json({ 'Register failed': validate.error.message });
        }
        else {
            console.log(validate);
            res.send('Register successful');
        }
    }
    catch (e) {
        console.log(e);
    }
});
exports.default = router;
