const ApiKey = require('../models/api_key');
const User = require('../models/user');
const { hashPassword } = require('./utils/hash_password');
/**
 * @description Añade un nuevo proyecto a User-Auth-API
 * @param {string} email Email del propietario del proyecto
 * @param {string} project Nombre del proyecto
 * @param {string} password Contraseña del propietario del proyecto
 */
async function postApiKey(email, project, password) {
  const [password1, password2] = await Promise.all([hashPassword(password), hashPassword(password)]);
  const api_key = new ApiKey({ email, project, password: password1 });
  const admin = new User({ email, admin: true, password: password2, api_key: api_key._id });
  await Promise.all([api_key.save(), admin.save()]);
  return { api_key: api_key._id, email, project };
}

module.exports = { postApiKey };
