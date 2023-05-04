const { Router } = require('express');
const verifyToken = require('../controllers/users/verifyToken');
const register = require('../controllers/auth/register');
const login = require('../controllers/auth/login');

const router = Router();

router.post('/register', async (req, res) => {
  const { api_key } = req.query;
  try {
    const data = await register({ ...req.body, api_key });
    res.status(201).json({ data });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await login(email, password, req.query.api_key);
    res.status(201).header('auth-token', token).json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/protected', verifyToken, async (req, res) => {});

module.exports = router;
