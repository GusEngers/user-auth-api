const hashPassword = require('../../controllers/hash-password');
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
      const password = await hashPassword(req.body.password);
      user.password = password;
      await user.save();
      return res.status(201).json({ msg: 'Usuario creado nuevamente', user });
    }
    throw {
      message: `El usuario con el e-mail '${user.email}' ya existe`,
      status: 400,
    };
  } catch (error) {
    const status = error.status ?? 400;
    return handleApiError(res, status, [error.message]);
  }
}

module.exports = verifyUser;
