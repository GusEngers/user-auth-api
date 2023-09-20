const User = require('../../models/user');
const {
  STATUS_INACTIVE,
  STATUS_ACTIVE,
  HEADER_API_KEY,
} = require('../../utils/constants');
const handleApiError = require('../../utils/handleApiError');

async function verifyUser(req, res, next) {
  try {
    const user = await User.findOne({
      email: req.body.email,
      api_key: req.header(HEADER_API_KEY),
    });
    if (!user) return next();
    if (user.status === STATUS_INACTIVE) {
      user.status = STATUS_ACTIVE;
      await user.save();
      return res.status(201).json({ msg: 'Usuario creado nuevamente', user });
    }
    throw new Error(`El usuario con el e-mail '${user.email}' ya existe`);
  } catch (error) {
    return handleApiError(res, 400, [error.message]);
  }
}

module.exports = verifyUser;
