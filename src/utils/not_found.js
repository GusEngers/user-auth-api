/**
 * @description Controlador para manejar rutas innexistentes
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function handleNotFound(req, res, next) {
  // Not Found - Sección API
  if (req.originalUrl.substring(0, 4) === '/v3/') {
    return res.status(404).json({
      message: 'Route not found',
      statusCode: 404,
    });
  }
  // Not Found - Sección Client
  res.render('pages/not_found');
}

module.exports = { handleNotFound };
