const { Router } = require('express');
const tokenVerification = require('../middlewares/token_verification');
const register = require('../controllers/auth/register');
const login = require('../controllers/auth/login');
const userVerification = require('../controllers/auth/user_verification');

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

router.get('/protected', tokenVerification, async (req, res) => {
  const { api_key } = req.query;
  try {
    await userVerification(req.user.id, api_key);
    res.json({ valid: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
