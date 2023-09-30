const ApiKey = require('../../models/api-key');
const registerUser = require('../api/auth/register-user');

async function generateApiKey({ email }) {
  try {
    const api = new ApiKey({ email });
    await api.save();
    const user = await registerUser({ email, admin: true, api_key: api._id });
    // return { user, msg: 'Ya te enviamos tu api-key. ¡Revisa tu correo!' };
    return {msg: `Momentaneamente no disponemos de servicio de notificación por correo. Su Api-Key es: '${api._id}', además dispone de un usuario administrador que puede utilizar con el e-mail '${email}' y contraseña 'Abcd12345' (puede cambiar ambos datos después).`}
  } catch (_) {
    throw new Error(
      'Lo sentimos, un error a ocurrido durante el proceso. ¡Inténtalo nuevamente!'
    );
  }
}

module.exports = generateApiKey;
