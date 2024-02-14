const { ResponseError } = require('../../utils/error.class');

/**
 * @description Controlador para manejar errores producidos en alguna instancia
 * @param {Error|ResponseError} err Error
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function errorHandler(err, req, res, next) {
  if (err instanceof ResponseError) {
    return res.status(err.statusCode).json(err.response);
  }
  return res.status(500).json({ message: 'Internal server error', statusCode: 500 });
}

module.exports = { errorHandler };
