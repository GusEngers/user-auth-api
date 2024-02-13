const { login, auth, signUp } = require('./auth.controllers');

module.exports = {
  loginController: [login],
  authController: [auth],
  signUpController: [signUp],
};
