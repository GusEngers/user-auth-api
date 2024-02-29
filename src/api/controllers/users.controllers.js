const { X_AUTHORIZATION_API_KEY } = require('../../utils/constants');
const { usersService } = require('../services');

/**
 * @description Controlador para obtener una lista de usuarios
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function getUsers(req, res, next) {
  try {
    const api_key = req.header(X_AUTHORIZATION_API_KEY);
    const { omit, limit, status } = req.query;
    const users = await usersService.getUsers(api_key, omit, limit, status);
    res.json(users);
  } catch (error) {
    next(error);
  }
}

/**
 * @description Controlador para obtener un usuario individualmente
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function getUser(req, res, next) {
  try {
    const api_key = req.header(X_AUTHORIZATION_API_KEY);
    const id = req.params.id;
    const user = await usersService.getUser(api_key, id);
    res.json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * @description Controlador para modificar e-mail o contraseña de un usuario individualmente
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function patchUser(req, res, next) {
  try {
    const api_key = req.header(X_AUTHORIZATION_API_KEY);
    const id = req.params.id;
    await usersService.patchUser(api_key, id, req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

/**
 * @description Controlador para eliminar un usuario individualmente
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function deleteUser(req, res, next) {
  try {
    const api_key = req.header(X_AUTHORIZATION_API_KEY);
    const id = req.params.id;
    await usersService.deleteUser(api_key, id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { getUsers, getUser, patchUser, deleteUser };
