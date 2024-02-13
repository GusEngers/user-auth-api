/**
 * @description Controlador para manejar inicio de sesión de usuarios
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function login(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

/**
 * @description Controlador para manejar autenticidad de token de sesión
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function auth(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

/**
 * @description Controlador para manejar registro de nuevo usuario
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function signUp(req, res, next) {
  try {
  } catch (error) {
    next(error);
  }
}

module.exports = { login, auth, signUp };
