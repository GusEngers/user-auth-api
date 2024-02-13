const api = require('express').Router();

// IMPORTAR CONTROLADORES
const { loginController, authController, signUpController } = require('../controllers');

/**
 * @description Rutas para el manejo de API-KEY
 */
api.route('/api_key');

/**
 * @description Rutas para la autenticación de Usuarios
 */
api.route('/users/login').post(loginController);
api.route('/users/auth').post(authController);
api.route('/users/sign_up').post(signUpController);

/**
 * @description Rutas para el manejo de la colección de Usuarios
 */
api.route('/users');

/**
 * @description Rutas para el manejo individual de Usuarios
 */
api.route('/users/:id');

module.exports = api;
