// SERVICIOS DE AUTENTICACIÓN
const { login, auth, signUp } = require('./auth.services');

module.exports = {
  authServices: { login, auth, signUp },
};
