'use strict';
const { Router } = require('express');
const router = Router();
const { register } = require('../controllers/users/register.js');

router.post('/', async (req, res) => {
  const { name, email, password, data } = req.body;
  try {
    const info = await register(name, email, password, data);
    res.status(201).json({
      data: info,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
