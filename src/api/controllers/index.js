// IMPORTAR CONTROLADORES
const { login, auth, signUp } = require('./auth.controllers');
const { getUsers, getUser, patchUser, deleteUser } = require('./users.controllers');
const { getRegister, changeStatus, changeAdmin } = require('./admin.controllers');
const { postApiKey } = require('./api_key.controllers');

// IMPORTAR MIDDLEWARES
const { errorHandler } = require('../middlewares/error');
const { checkAuthBody, checkUserBody, checkApiKeyBody } = require('../middlewares/check_body');
const { checkUsersQuery, checkAdminUsersQuery } = require('../middlewares/check_query');
const { checkUserIdParam, checkAdminTypeParam } = require('../middlewares/check_params');
const { checkSameUser, checkAdmin } = require('../middlewares/check_token');

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
  getUsersController: [checkUsersQuery, getUsers, errorHandler],
  getUserController: [checkUserIdParam, getUser, errorHandler],
  patchUserController: [checkUserIdParam, checkSameUser, checkUserBody, patchUser, errorHandler],
  deleteUserController: [checkUserIdParam, checkSameUser, deleteUser, errorHandler],
  getRegisterController: [checkAdmin, checkAdminTypeParam, checkAdminUsersQuery, getRegister, errorHandler],
  changeStatusController: [checkAdmin, checkUserIdParam, changeStatus, errorHandler],
  changeAdminController: [checkAdmin, checkUserIdParam, changeAdmin, errorHandler],
  postApiKeyController: [checkApiKeyBody, postApiKey, errorHandler],
  methodNotAllowed,
};
