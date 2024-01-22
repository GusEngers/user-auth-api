const ApiKey = require('../models/api-key');
const registerUser = require('../api/auth/register-user');
const ResponseError = require("../utils/error.class")

/**
 * Añade una nueva ApiKey según el email recibido, además añade un nuevo usuario administrador
 * con el email ingresado
 * @param {string} email Email del nuevo administrador
 * @returns Objeto con los datos del usuario administrador
 */
async function generateApiKeyService(email) {
  try {
    const api = new ApiKey({ email });
    await api.save();
    return api;
    // const user = await registerUser({ email, admin: true, api_key: api._id });
    // // return { user, msg: 'Ya te enviamos tu api-key. ¡Revisa tu correo!' };
    // return {msg: `Momentaneamente no disponemos de servicio de notificación por correo. Su Api-Key es: '${api._id}', además dispone de un usuario administrador que puede utilizar con el e-mail '${email}' y contraseña 'Abcd12345' (puede cambiar ambos datos después).`}
  } catch (error) {
    throw new ResponseError('Error generate Api-Key', 400)
  }
}

module.exports = { generateApiKey };
