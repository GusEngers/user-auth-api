const router = require('express').Router();

// Middlewares
const verifyBody = require('../../middlewares/api/verify-body');
const verifyUser = require('../../middlewares/api/verify-user');
const handleApiError = require('../../utils/handleApiError');

// Controllers
const registerUser = require('../../controllers/api/register-user');

router.post('/register', verifyBody, verifyUser, async (req, res) => {
  try {
    const user = await registerUser({
      ...req.body,
      api_key: req.header('Api-Key'),
    });
    res.status(201).json({ msg: 'Usuario creado exitosamente', user });
  } catch (error) {
    return handleApiError(res, 400, [error.message]);
  }
});

module.exports = router;