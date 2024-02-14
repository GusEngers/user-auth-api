// IMPORTAR CONTROLADORES
const { login, auth, signUp } = require('./auth.controllers');

// IMPORTAR MIDDLEWARES
const { errorHandler } = require('../middlewares/error');

module.exports = {
  loginController: [login, errorHandler],
  authController: [auth, errorHandler],
  signUpController: [signUp, errorHandler],
};
