import express from 'express';

const router = express.Router();
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
  if (req.body.username === 'user' && req.body.password === '1234') {
    res.send('Login successful');
  } else {
    console.log(req.body);
    res.send('Login failed');
  }
});

export default router;
