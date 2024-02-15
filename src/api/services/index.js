// SERVICIOS DE AUTENTICACIÓN
const { login, auth, signUp } = require('./auth.services');
const { getUsers, getUser, patchUser, deleteUser } = require('./users.services');
const { getRegister, changeStatus } = require('./admin.services');
const { postApiKey } = require('./api_key.services');

module.exports = {
  authServices: { login, auth, signUp },
  usersService: { getUsers, getUser, patchUser, deleteUser },
  adminServices: { getRegister, changeStatus },
  apiKeyServices: { postApiKey },
};
