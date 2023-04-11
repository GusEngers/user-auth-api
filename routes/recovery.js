'use strict';
const { Router } = require('express');
const router = Router();
const { recoveryUser } = require('../controllers/users/recovery.js');

router.put('/user', async (req, res) => {
  const { id } = req.query;
  try {
    let data = await recoveryUser(id);
    res.json({
      data,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
