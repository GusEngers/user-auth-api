'use strict';
const { Router } = require('express');
const router = Router();
const { getList, getUser } = require('../controllers/users/get_user.js');
const {
  logicalDelete,
  definitiveDelete,
} = require('../controllers/users/delete_user.js');
const { recoveryUser } = require('../controllers/users/recovery_user.js');

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

router
  .route('/id/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      let data = await getUser(id, req.query.api_key);
      res.json(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    try {
      const data = await logicalDelete(id, req.query.api_key);
      res.send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const data = await definitiveDelete(id, req.query.api_key);
      res.send(data);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

router.put('/recovery/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await recoveryUser(id, req.query.api_key);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
