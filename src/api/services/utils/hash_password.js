const bcrypt = require('bcrypt');

/**
 * @description Genera la codificación de la contraseña del usuario
 * @param {string} password Contraseña de usuario
 * @returns Contraseña codificada
 */
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const encode = await bcrypt.hash(password, salt);
  return encode;
}

module.exports = { hashPassword };
