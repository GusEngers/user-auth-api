const router = require('express').Router();
const { HEADER_API_KEY } = require('../../utils/constants');

// Middlewares
const handleApiError = require('../../utils/handleApiError');
const {
  onlyEmail,
  onlyPassword,
} = require('../../middlewares/api/verify-body');

// Controllers
const changeData = require('../../controllers/api/users/change-data');
const changeEmail = require('../../controllers/api/users/change-email');
const changePassword = require('../../controllers/api/users/change-password');

router.put('/data', async (req, res) => {
  try {
    if (!Object.keys(req.body).length) {
      throw {
        message: 'Es necesario la nueva información para actualizar el usuario',
        status: 400,
      };
    }
    const info = await changeData({
      _id: req.params.id,
      api_key: req.header(HEADER_API_KEY),
      data: req.body,
    });
    res.json(info);
  } catch (error) {
    const status = error.status ?? 400;
    return handleApiError(res, status, [error.message]);
  }
});

router.put(
  '/email',
  onlyEmail,
  async (req, res) => {
    try {
      const info = await changeEmail({
        _id: req.params.id,
        api_key: req.header(HEADER_API_KEY),
        email: req.body.email,
      });
      res.json(info);
    } catch (error) {
      const status = error.status ?? 400;
      return handleApiError(res, status, [error.message]);
    }
  }
);

router.put(
  '/password',
  onlyPassword,
  async (req, res) => {
    try {
      const info = await changePassword({
        _id: req.params.id,
        api_key: req.header(HEADER_API_KEY),
        password: req.body.password,
      });
      res.json(info);
    } catch (error) {
      const status = error.status ?? 400;
      return handleApiError(res, status, [error.message]);
    }
  }
);

module.exports = router;
