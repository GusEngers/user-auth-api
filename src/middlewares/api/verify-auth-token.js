const jwt = require('jsonwebtoken');
const handleApiError = require('../../utils/handleApiError');
const { HEADER_TOKEN } = require('../../utils/constants');
require('dotenv').config();

function verifyAuthToken(req, res, next) {
  const token = req.header(HEADER_TOKEN);
  if (!token)
    return handleApiError(res, 401, [
      "Para acceder debe proporcionar la cabecera 'Token'",
    ]);
  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    return handleApiError(res, 401, ['El token proporcionado es inválido']);
  }
}

module.exports = verifyAuthToken;
