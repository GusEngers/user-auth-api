// IMPORTAR CONTROLADORES
const { login, auth, signUp } = require('./auth.controllers');

// IMPORTAR MIDDLEWARES
const { errorHandler } = require('../middlewares/error');
const { checkAuthBody } = require('../middlewares/check_body');

// CONTROLADORES GLOBALES
/**
 * @description Controlador para manejar métodos no disponibles en las solicitudes
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function methodNotAllowed(req, res, next) {
  res.status(405).json({ message: 'Method not allowed', statusCode: 405 });
}

module.exports = {
  loginController: [checkAuthBody, login, errorHandler],
  authController: [auth, errorHandler],
  signUpController: [checkAuthBody, signUp, errorHandler],
  methodNotAllowed,
};
