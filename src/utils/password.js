const bcrypt = require('bcrypt');
const ResponseError = require('./error.class');

/**
 * Función que encripta un string según su configuracón
 * @param {string} pass Contraseña que se encriptará
 * @returns Contraseña encriptada
 */
async function hashPassword(pass) {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(pass, salt);
    return password;
  } catch (error) {
    throw new ResponseError('Error hash password', 400, [errormessage]);
  }
}

/**
 * Compara la contraseña ingresada con la contraseña original con hash
 * @param {string} comp Contraseña original con hash
 * @param {string} pass Contraseña ingresada
 * @return Booleano indicando si son iguales o no
 */
async function comparePasswords(comp, pass) {
  try {
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw new Error('Passwords not coincide');
    }
    return true;
  } catch (error) {
    throw new ResponseError('Error compare passwords', 400, [error.message]);
  }
}

module.exports = { hashPassword, comparePasswords };
