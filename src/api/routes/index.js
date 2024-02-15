const api = require('express').Router();

// IMPORTAR CONTROLADORES
const {
  loginController,
  authController,
  signUpController,
  getUsersController,
  getUserController,
  patchUserController,
  deleteUserController,
  getRegisterController,
  methodNotAllowed,
} = require('../controllers');

/**
 * @description Rutas para el manejo de API-KEY
 */
api.route('/api_key').all(methodNotAllowed);

/**
 * @description Rutas para la autenticación de Usuarios
 */
api.route('/users/login').post(loginController).all(methodNotAllowed);
api.route('/users/auth').post(authController).all(methodNotAllowed);
api.route('/users/sign_up').post(signUpController).all(methodNotAllowed);

/**
 * @description Rutas para el manejo de la colección de Usuarios
 */
api.route('/users').get(getUsersController).all(methodNotAllowed);

/**
 * @description Rutas para el manejo individual de Usuarios
 */
api.route('/users/:id').get(getUserController).patch(patchUserController).delete(deleteUserController).all(methodNotAllowed);

/**
 * @description Rutas para el manejo de Usuarios a través de admin
 */
api.route('/admin/users/:type').get(getRegisterController).all(methodNotAllowed);

module.exports = api;
