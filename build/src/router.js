"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const joi_1 = require("./services/joi");
const router = express_1.default.Router();
/**
 * @swagger
 *
 * /api:
 *   get:
 *     description: home to the application
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: login
 */
router.get('/', (req, res) => {
    res.send('Api router works!');
});
/**
 * @swagger
 *
 * /api/login:
 *   post:
 *     description: Login to the application test.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username to use for login user = user.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: User's password pass = 1234.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: login
 */
router.post('/login', (req, res) => {
    const validate = (0, joi_1.validateLogin)(req.body);
    if (validate.error === undefined) {
        console.log(req.body);
        console.log(validate);
        res.send('Login failed');
    }
    else {
        console.log(validate);
        res.send('Login successful');
    }
});
exports.default = router;
