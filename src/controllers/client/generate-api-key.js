const ApiKey = require('../../models/api-key');

async function generateApiKey({ email }) {
  try {
    const api = new ApiKey({ email });
    await api.save();
    return 'Ya te enviamos tu api-key. ¡Revisa tu correo!';
  } catch (_) {
    throw new Error(
      'Lo sentimos, un error a ocurrido durante el proceso. ¡Inténtalo nuevamente!'
    );
  }
}

module.exports = generateApiKey;
