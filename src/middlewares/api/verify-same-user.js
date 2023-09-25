const handleApiError = require('../../utils/handleApiError');

function verifySameUser(req, res, next) {
  if (req.user._id !== req.params.id) {
    return handleApiError(res, 403, [
      'Solo el usuario original puede administrar este usuario',
    ]);
  }
  next();
}

module.exports = verifySameUser;
