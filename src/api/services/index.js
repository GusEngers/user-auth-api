// SERVICIOS DE AUTENTICACIÓN
const { login, auth, signUp } = require('./auth.services');
const { getUsers, getUser } = require('./users.services');

module.exports = {
  authServices: { login, auth, signUp },
  usersService: { getUsers, getUser },
};
