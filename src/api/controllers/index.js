// IMPORTAR CONTROLADORES
const { login, auth, signUp } = require('./auth.controllers');

// IMPORTAR MIDDLEWARES

module.exports = {
  loginController: [login],
  authController: [auth],
  signUpController: [signUp],
};
