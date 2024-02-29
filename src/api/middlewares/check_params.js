const { isObjectIdOrHexString } = require('mongoose');
const { ResponseError } = require('../../utils/error.class');
const { DAY, WEEK, MONTH } = require('../../utils/constants');

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

/**
 * @description Verifica si el tipo de fecha recibido pertenece a los tipos predeterminados
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function checkAdminTypeParam(req, res, next) {
  const { type } = req.params;
  if (type.toLowerCase() === DAY.name || type.toLowerCase() === WEEK.name || type.toLowerCase() === MONTH.name) return next();
  return next(new ResponseError('Invalid type', 403, ["Only accepts 'day', 'week' or 'month'"]));
}

module.exports = { checkUserIdParam, checkAdminTypeParam };
