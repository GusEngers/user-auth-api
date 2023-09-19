const ApiKey = require('../../models/api-key');
const registerUser = require('../api/register-user');

async function generateApiKey({ email }) {
  try {
    const api = new ApiKey({ email });
    await api.save();
    const user = await registerUser({ email, admin: true, api_key: api._id });
    return { user, msg: 'Ya te enviamos tu api-key. ¡Revisa tu correo!' };
  } catch (_) {
    throw new Error(
      'Lo sentimos, un error a ocurrido durante el proceso. ¡Inténtalo nuevamente!'
    );
  }
}

module.exports = generateApiKey;
