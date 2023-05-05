'use strict';
const { Router } = require('express');
const router = Router();
const { getList, getUser } = require('../controllers/users/get_user.js');

router.get('/list/:status', async (req, res) => {
  const { status } = req.params;
  try {
    let users = await getList(status, req.query.api_key);
    res.json({
      count: users.length,
      status,
      users,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/id/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let data = await getUser(id, req.query.api_key);
    res.json(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
