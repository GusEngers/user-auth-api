const User = require('../models/user');
const ResponseError = require('../utils/error.class');
const { hashPassword } = require('../utils/password');

/**
 * Crea y añade un nuevo usuario a la base de datos
 * @param body Objetos con los datos del nuevo usuario
 * @returns Usuario creado
 */
async function signUpService({ email, password, admin, data, api_key }) {
  try {
    const pass = await hashPassword(password);
    if (admin) {
      const user = new User({ email, password: pass, admin, data, api_key });
      await user.save();
      return user;
    }
    const user = new User({ email, password: pass, data, api_key });
    await user.save();
    return user;
  } catch (error) {
    throw new ResponseError(error.message, 400);
  }
}

module.exports = {
  signUpService,
};
