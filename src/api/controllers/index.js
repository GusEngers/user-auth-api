// IMPORTAR CONTROLADORES
const { login, auth, signUp } = require('./auth.controllers');

// IMPORTAR MIDDLEWARES
const { errorHandler } = require('../middlewares/error');
const { checkAuthBody } = require('../middlewares/check_body');

module.exports = {
  loginController: [checkAuthBody, login, errorHandler],
  authController: [auth, errorHandler],
  signUpController: [checkAuthBody, signUp, errorHandler],
};
