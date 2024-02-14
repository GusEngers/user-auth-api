// SERVICIOS DE AUTENTICACIÓN
const { login, auth, signUp } = require('./auth.services');
const { getUsers } = require('./users.services');

module.exports = {
  authServices: { login, auth, signUp },
  usersService: { getUsers },
};
