const { TOKEN, X_AUTHORIZATION_TOKEN } = require('../../utils/constants');
const { ResponseError } = require('../../utils/error.class');

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

module.exports = { checkSameUser };
