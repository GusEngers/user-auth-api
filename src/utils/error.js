const { ResponseError } = require('./error.class');

/**
 * @description Controlador para errores globales
 * @param {Error|ResponseError} err Error
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function handleGlobalError(err, req, res, next) {
  // Errores sección API
  if (req.originalUrl.substring(0, 4) === '/v3/') {
    if (err instanceof ResponseError) return res.status(err.statusCode).json(err.response);
    return res.status(500).json({ message: 'Internal server error', statusCode: 500, errors: [err.message] });
  }
  // Errores sección Client
  return res.render('pages/error', { error: err.message });
}

module.exports = { handleGlobalError };
