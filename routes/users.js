'use strict';
const { Router } = require('express');
const router = Router();
const { usersList } = require('../controllers/users/usersList.js');
const userData = require('../controllers/users/userData.js');

router.get('/', async (req, res) => {
  const { status } = req.query;
  try {
    let data = await usersList(status);
    res.json({
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let data = await userData(id);
    res.json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
