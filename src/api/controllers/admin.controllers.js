const { X_AUTHORIZATION_API_KEY } = require('../../utils/constants');
const { adminServices } = require('../services');

/**
 * @description Controlador para obtener una lista con los últimos usuarios registrados del mes, semana o día
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function getRegister(req, res, next) {
  try {
    const api_key = req.header(X_AUTHORIZATION_API_KEY);
    const { omit, limit } = req.query;
    const { type } = req.params;
    const users = await adminServices.getRegister(api_key, type, omit, limit);
    res.json(users);
  } catch (error) {
    next(error);
  }
}

/**
 * @description Controlador para cambiar el estado de un usuario
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function changeStatus(req, res, next) {
  try {
    const api_key = req.header(X_AUTHORIZATION_API_KEY);
    const id = req.params.id;
    await adminServices.changeStatus(api_key, id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

/**
 * @description Controlador para cambiar la propiedad admin de un usuario
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function changeAdmin(req, res, next) {
  try {
    const api_key = req.header(X_AUTHORIZATION_API_KEY);
    const id = req.params.id;
    await adminServices.changeAdmin(api_key, id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { getRegister, changeStatus, changeAdmin };
