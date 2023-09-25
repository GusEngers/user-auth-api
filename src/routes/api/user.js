const router = require('express').Router();
const { HEADER_API_KEY } = require('../../utils/constants');

// Middlewares
const verifyAuthToken = require('../../middlewares/api/verify-auth-token');
const verifySameUser = require('../../middlewares/api/verify-same-user');
const verifyIdFormat = require('../../middlewares/api/verify-id-format');
const handleApiError = require('../../utils/handleApiError');

// Controllers
const { deleteUser } = require('../../controllers/api/users/delete-user');
const getUser = require('../../controllers/api/users/get-user');

// Routes
const change = require('./change');

router.use(
  '/:id/change',
  verifyIdFormat,
  verifyAuthToken,
  verifySameUser,
  change
);

router
  .route('/:id')
  .get(verifyIdFormat, async (req, res) => {
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
  .delete(verifyIdFormat, verifyAuthToken, verifySameUser, async (req, res) => {
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
