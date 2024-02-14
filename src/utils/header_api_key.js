const { isObjectIdOrHexString } = require('mongoose');
const ApiKey = require('../api/models/api_key');
const { X_AUTHORIZATION_API_KEY } = require('./constants');
const { ResponseError } = require('./error.class');

/**
 * @description Middleware para verificar la API-KEY
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function handleApiKey(req, res, next) {
  const header = req.header(X_AUTHORIZATION_API_KEY);
  // Verificar requerimiento y formato
  if (!header) return next(new ResponseError(`'${X_AUTHORIZATION_API_KEY}' header required`, 401));
  if (!isObjectIdOrHexString(header)) return next(new ResponseError(`Invalid '${X_AUTHORIZATION_API_KEY}' header format`, 401));
  // Verificar existencia
  const api = await ApiKey.findById(header).lean();
  if (!api) return next(new ResponseError(`'${X_AUTHORIZATION_API_KEY}' header not found`, 404));
  return next();
}

module.exports = { handleApiKey };
