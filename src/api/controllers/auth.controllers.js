// IMPORTAR CONSTANTES
const { X_AUTHORIZATION_API_KEY, X_AUTHORIZATION_TOKEN } = require('../../utils/constants');
// IMPORTAR SERVICIOS
const { authServices } = require('../services');

/**
 * @description Controlador para manejar inicio de sesión de usuarios
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const api_key = req.header(X_AUTHORIZATION_API_KEY);
    const data = await authServices.login(email, password, api_key);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * @description Controlador para manejar autenticidad de token de sesión
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function auth(req, res, next) {
  try {
    const token = req.header(X_AUTHORIZATION_TOKEN);
    const api_key = req.header(X_AUTHORIZATION_API_KEY);
    const data = await authServices.auth(token, api_key);
    res.json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * @description Controlador para manejar registro de nuevo usuario
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function signUp(req, res, next) {
  try {
    const { email, password } = req.body;
    const api_key = req.header(X_AUTHORIZATION_API_KEY);
    const data = await authServices.signUp(email, password, api_key);
    res.location(`/v3/users/${data._id}`).status(201).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = { login, auth, signUp };
