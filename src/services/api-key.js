const ApiKey = require('../models/api-key');
const ResponseError = require('../utils/error.class');
const { signUpService } = require('./users');

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

    let config = {
      email,
      password: 'Abcd12345',
      admin: true,
      api_key: api._id,
    };
    await signUpService(config);
    return user._id;
  } catch (error) {
    throw new ResponseError('Error generate Api-Key', 400, [error.message]);
  }
}

module.exports = { generateApiKeyService };
