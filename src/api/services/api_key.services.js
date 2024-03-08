const { axios } = require('../../utils/axios');
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

/**
 * Envía un correo electrónico con los datos de acceso a las funcionalidades de la API
 * @param {string} api_key API Key del proyecto
 * @param {string} email Email del adminisrador
 * @param {string} password Contraseña del administrador
 */
async function sendEmailApiKey(api_key, email, password) {
  const subject = 'Bienvenido a User-Auth-Api';
  await axios
    .post(`/message/65eb1b848651ea155270faab?subject=${subject}&email=${email}&name=UserAuthApi`, { apikey: api_key, email, password })
    .catch((e) => {
      throw new Error(e);
    });
}

module.exports = { postApiKey, sendEmailApiKey };
