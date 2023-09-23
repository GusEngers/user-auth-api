const router = require('express').Router();
const getUser = require('../../controllers/api/users/get-user');
const verifyIdFormat = require('../../middlewares/api/verify-id-format');
const { HEADER_API_KEY } = require('../../utils/constants');
const handleApiError = require('../../utils/handleApiError');

router.use('/user/:id', verifyIdFormat);
router.route('/user/:id').get(async (req, res) => {
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
});

module.exports = router;
