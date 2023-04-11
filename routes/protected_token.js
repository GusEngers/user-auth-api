'use strict';
const { Router } = require('express');
const verifyUser = require('../controllers/users/verifyUser');
const router = Router();

router.get('/', async (req, res) => {
  try {
    if (await verifyUser(req.name.id)) {
      res.json({ error: null });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
