const { isObjectIdOrHexString } = require('mongoose');
const handleApiError = require('../../utils/handleApiError');

function verifyIdFormat(req, res, next) {
  if (!isObjectIdOrHexString(req.params.id)) {
    return handleApiError(res, 400, ['El ID no tiene un formato válido']);
  }
  next();
}

module.exports = verifyIdFormat;
