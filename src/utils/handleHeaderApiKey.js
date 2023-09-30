const { isObjectIdOrHexString } = require('mongoose');
const ApiKey = require('../models/api-key');
const handleApiError = require('./handleApiError');
const { HEADER_API_KEY } = require('./constants');

module.exports = async (req, res, next) => {
  const header = req.header(HEADER_API_KEY);
  try {
    if (!header) {
      return handleApiError(res, 401, [
        `Para acceder debe proporcionar la cabecera 'X-Authorization-Api-Key'`,
      ]);
    }

    if (!isObjectIdOrHexString(header)) {
      return handleApiError(res, 403, [
        'La Api-Key no tiene un formato válido',
      ]);
    }

    const api = await ApiKey.findById(header);
    if (!api) {
      throw { message: 'La Api-Key proporcionada no existe', status: 404 };
    }
    next();
  } catch (error) {
    const status = error.status ?? 400;
    return handleApiError(res, status, [error.message]);
  }
};
