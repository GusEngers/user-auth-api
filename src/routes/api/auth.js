const router = require('express').Router();
const { HEADER_API_KEY } = require('../../utils/constants');

// Middlewares
const verifyAuthToken = require('../../middlewares/api/verify-auth-token');
const { verifyBody } = require('../../middlewares/api/verify-body');
const verifyUser = require('../../middlewares/api/verify-user');
const handleApiError = require('../../utils/handleApiError');

// Controllers
const authUser = require('../../controllers/api/auth/auth-user');
const registerUser = require('../../controllers/api/auth/register-user');
const loginUser = require('../../controllers/api/auth/login-user');

router.post('/', verifyAuthToken, async (req, res) => {
  try {
    const msg = await authUser({
      _id: req.user._id,
      api_key: req.header(HEADER_API_KEY),
    });
    res.json({ msg });
  } catch (error) {
    return handleApiError(res, 401, [error.message]);
  }
});

router.post('/register', verifyBody, verifyUser, async (req, res) => {
  try {
    const user = await registerUser({
      ...req.body,
      api_key: req.header(HEADER_API_KEY),
    });
    res.status(201).json({ msg: 'Usuario creado exitosamente', user });
  } catch (error) {
    return handleApiError(res, 400, [error.message]);
  }
});

router.post('/login', verifyBody, async (req, res) => {
  try {
    const token = await loginUser({
      ...req.body,
      api_key: req.header(HEADER_API_KEY),
    });
    res.status(201).json({ msg: 'Inicio de sesión exitoso', token });
  } catch (error) {
    return handleApiError(res, 400, [error.message]);
  }
});

module.exports = router;
