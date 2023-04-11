'use strict';
const { Router } = require('express');
const router = Router();
const { login } = require('../controllers/users/login.js');

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await login(email, password);
    res.header('auth-token', token).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
