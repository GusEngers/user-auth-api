'use strict';
const { Router } = require('express');
const router = Router();
const {
  logicalDelete,
  definitiveDelete,
} = require('../controllers/users/delete.js');

router.put('/', async (req, res) => {
  const { id } = req.query;
  try {
    let data = await logicalDelete(id);
    res.json({
      data,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/danger', async (req, res) => {
  const { api_key, id } = req.query;
  try {
    if (await verificationApiKey(api_key)) {
      let data = await definitiveDelete(api_key, id);
      res.json({
        data,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
