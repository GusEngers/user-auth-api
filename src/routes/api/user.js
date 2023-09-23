const router = require('express').Router();
const { HEADER_API_KEY } = require('../../utils/constants');

// Middlewares
const verifyAuthToken = require('../../middlewares/api/verify-auth-token');
const verifyIdFormat = require('../../middlewares/api/verify-id-format');
const verifySameUser = require('../../middlewares/api/verify-same-user');
const handleApiError = require('../../utils/handleApiError');

// Controllers
const changeData = require('../../controllers/api/users/change-data');
const { deleteUser } = require('../../controllers/api/users/delete-user');
const getUser = require('../../controllers/api/users/get-user');

router.use('/user/:id', verifyIdFormat);
router
  .route('/user/:id')
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
  .post(verifyAuthToken, verifySameUser, async (req, res) => {
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

module.exports = router;
