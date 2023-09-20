const User = require('../../models/user');
const handleApiError = require('../../utils/handleApiError');

async function verifyUser(req, res, next) {
  try {
    const user = await User.findOne({
      email: req.body.email,
      api_key: req.header('Api-Key'),
    });
    if (!user) return next();
    throw new Error(`El usuario con el e-mail '${user.email}' ya existe`);
  } catch (error) {
    return handleApiError(res, 400, [error.message]);
  }
}

module.exports = verifyUser;
