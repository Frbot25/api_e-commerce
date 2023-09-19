import express from 'express';
import checkJwt from './middlewares/checkJwt';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ObjectSchema } from 'joi';
import ProductController from './controllers/productsController';
import userController from './controllers/usersController';
import isAdmin from './middlewares/checkIsAdmin';
const router = express.Router();
/**
 * @swagger
 * paths:
 *  /api:
 *   get:
 *     summary: Use to request home
 *     tags:
 *      - Home
 */
router.get('/products', ProductController.findAllProducts);
/**
 * @swagger
 * paths:
 *  /api:
 *   get:
 *     summary: Use to request home
 *     tags:
 *      - Home
 */
router.get('/products/:id', ProductController.findProductById);
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
router.post('/signin', userController.signin);
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
router.post('/signup', userController.signup);

// test route verify token
router.get('/test', checkJwt, isAdmin, (request, response) => {
  response.status(200).json({ message: 'test' });
});
export default router;
