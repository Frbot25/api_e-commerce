import express from 'express';
import { validateLogin } from './services/joi';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ObjectSchema } from 'joi';

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
router.get('/', (req, res) => {
  res.send('Api router works!');
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
    const validate = validateLogin(req.body);
    if (validate.error) {
      console.log(req.body);
      console.log(validate);
      res.status(400).json({ 'Login failed': validate.error.message });
    } else {
      console.log(validate);
      res.send('Login successful');
    }
  } catch (e) {
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
    const validate = validateLogin(req.body);
    if (validate.error) {
      console.log(req.body);
      console.log(validate);
      res.status(400).json({ 'Register failed': validate.error.message });
    } else {
      console.log(validate);
      res.send('Register successful');
    }
  } catch (e) {
    console.log(e);
  }
});

export default router;
