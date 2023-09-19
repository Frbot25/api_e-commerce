"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkJwt_1 = __importDefault(require("./middlewares/checkJwt"));
const productsController_1 = __importDefault(require("./controllers/productsController"));
const usersController_1 = __importDefault(require("./controllers/usersController"));
const checkIsAdmin_1 = __importDefault(require("./middlewares/checkIsAdmin"));
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
router.get('/products', productsController_1.default.findAllProducts);
/**
 * @swagger
 * paths:
 *  /api:
 *   get:
 *     summary: Use to request home
 *     tags:
 *      - Home
 */
router.get('/products/:id', productsController_1.default.findProductById);
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
router.post('/signin', usersController_1.default.signin);
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
router.post('/signup', usersController_1.default.signup);
// test route verify token
router.get('/test', checkJwt_1.default, checkIsAdmin_1.default, (request, response) => {
    response.status(200).json({ message: 'test' });
});
exports.default = router;
