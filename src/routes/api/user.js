const router = require('express').Router();
const { HEADER_API_KEY } = require('../../utils/constants');

// Middlewares
const verifyAuthToken = require('../../middlewares/api/verify-auth-token');
const verifySameUser = require('../../middlewares/api/verify-same-user');
const verifyIdFormat = require('../../middlewares/api/verify-id-format');
const handleApiError = require('../../utils/handleApiError');
const {
  onlyEmail,
  onlyPassword,
} = require('../../middlewares/api/verify-body');

// Controllers
const changeData = require('../../controllers/api/users/change-data');
const { deleteUser } = require('../../controllers/api/users/delete-user');
const getUser = require('../../controllers/api/users/get-user');
const changeEmail = require('../../controllers/api/users/change-email');
const changePassword = require('../../controllers/api/users/change-password');

router.use('/:id', verifyIdFormat);
router
  .route('/:id')
  .get(async (req, res) => {
    try {
      const user = await getUser({
        _id: req.params.id,
        api_key: req.header(HEADER_API_KEY),
      });
      res.json(user);
    } catch (error) {
      const status = error.status ?? 400;
      return handleApiError(res, status, [error.message]);
    }
  })
  .put(verifyAuthToken, verifySameUser, async (req, res) => {
    try {
      if (!Object.keys(req.body).length) {
        throw {
          message:
            'Es necesario la nueva información para actualizar el usuario',
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
  })
  .delete(verifyAuthToken, verifySameUser, async (req, res) => {
    try {
      const msg = await deleteUser({
        _id: req.params.id,
        api_key: req.header(HEADER_API_KEY),
      });
      res.json({ msg });
    } catch (error) {
      const status = error.status ?? 400;
      return handleApiError(res, status, [error.message]);
    }
  });

router.put(
  '/:id/change/email',
  verifyAuthToken,
  verifySameUser,
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
  '/:id/change/password',
  verifyAuthToken,
  verifySameUser,
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
