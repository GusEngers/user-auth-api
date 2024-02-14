const { isObjectIdOrHexString } = require('mongoose');
const { ResponseError } = require('../../utils/error.class');

/**
 * @description Verifica si el id recibido como parámetro tiene el formato correcto
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function checkUserIdParam(req, res, next) {
  if (!isObjectIdOrHexString(req.params.id)) return next(new ResponseError('Invalid id format', 403));
  next();
}

module.exports = { checkUserIdParam };
