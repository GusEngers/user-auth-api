const { STATUS_ACTIVE, STATUS_INACTIVE } = require('../../utils/constants');
const { ResponseError } = require('../../utils/error.class');

/**
 * @description Verifica si los datos necesarios para los filtros de consulta de usuarios
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function checkUsersQuery(req, res, next) {
  let { omit, limit, status } = req.query;
  let errors = [];
  // Verificar query omit
  if (omit && isNaN(Number(omit))) {
    errors.push("Query 'omit' must be numeric");
  }
  // Verificar query limit
  if (limit && isNaN(Number(limit))) {
    errors.push("Query 'limit' must be numeric");
  }
  // Verificar query status
  if ((status && status.toLowerCase() !== 'all') || status.toLowerCase() !== STATUS_ACTIVE || status.toLowerCase() !== STATUS_INACTIVE) {
    errors.push("Query 'status' only accepts 'all', 'active' or 'inactive'");
  }
  // Verificar errores
  if (!errors.length) return next();
  next(new ResponseError('Invalid data received', 403, errors));
}

/**
 * @description Verifica si los datos necesarios para los filtros de consulta de usuarios a través de admin son correctos
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function checkAdminUsersQuery(req, res, next) {
  let { omit, limit, status } = req.query;
  let errors = [];
  // Verificar query omit
  if (omit && isNaN(Number(omit))) {
    errors.push("Query 'omit' must be numeric");
  }
  // Verificar query limit
  if (limit && isNaN(Number(limit))) {
    errors.push("Query 'limit' must be numeric");
  }
  // Verificar errores
  if (!errors.length) return next();
  next(new ResponseError('Invalid data received', 403, errors));
}

module.exports = { checkUsersQuery, checkAdminUsersQuery };
