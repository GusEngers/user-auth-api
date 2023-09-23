const User = require('../../../models/user');
const { STATUS_INACTIVE } = require('../../../utils/constants');
const hashPassword = require('../../hash-password');

async function changePassword({ _id, api_key, password }) {
  try {
    const user = await User.findOne({ _id, api_key });
    if (!user) {
      throw { message: 'Usuario no encontrado', status: 404 };
    }
    if (user.status === STATUS_INACTIVE) {
      throw { message: 'El usuario se encuentra inactivo', status: 400 };
    }
    const hash = await hashPassword(password);
    user.password = hash;
    await user.save();
    return { msg: 'Se actualizó la contraseña del usuario' };
  } catch (error) {
    throw error;
  }
}

module.exports = changePassword;
