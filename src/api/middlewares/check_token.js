const { TOKEN, X_AUTHORIZATION_TOKEN, X_AUTHORIZATION_API_KEY } = require('../../utils/constants');
const { ResponseError } = require('../../utils/error.class');
const User = require('../models/user');

/**
 * @description Verifica si el id obtenido del token es igual al id recibido como parametro
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function checkSameUser(req, res, next) {
  // Obtener el token
  const token = req.header(X_AUTHORIZATION_TOKEN);
  if (!token) return next(new ResponseError('Required session token', 403));
  // Decodificar el token
  const decode = jwt.verify(token, TOKEN);
  if (decode._id !== req.params.id) return next(new ResponseError('Unauthorized user', 401));
  next();
}

/**
 * @description Verifica si el usuario con sesión iniciada es un administrador
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function checkAdmin(req, res, next) {
  const api_key = req.header(X_AUTHORIZATION_API_KEY);
  // Obtener el token
  const token = req.header(X_AUTHORIZATION_TOKEN);
  if (!token) return next(new ResponseError('Required session token', 403));
  // Decodificar el token
  const decode = jwt.verify(token, TOKEN);
  const user = await User.findOne({ api_key, _id: decode._id }).select('-api_key -password').lean();
  if (!user.admin) return next(new ResponseError('Unauthorized user', 401, ['User not admin']));
  next();
}

module.exports = { checkSameUser, checkAdmin };
