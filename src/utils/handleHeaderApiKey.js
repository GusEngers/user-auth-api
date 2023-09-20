const { isObjectIdOrHexString } = require('mongoose');
const ApiKey = require('../models/api-key');
const handleApiError = require('./handleApiError');

module.exports = async (req, res, next) => {
  const header = req.header('Api-Key');
  try {
    if (!header) {
      return handleApiError(res, 401, [
        "Para acceder debe proporcionar la cabecera 'Api-Key'",
      ]);
    }

    if (!isObjectIdOrHexString(header)) {
      return handleApiError(res, 403, [
        'La Api-Key no tiene un formato válido',
      ]);
    }

    const api = await ApiKey.findById(header);
    if (!api) {
      throw new Error('La Api-Key proporcionada no existe');
    }
    next();
  } catch (error) {
    return handleApiError(res, 404, [error.message]);
  }
};
