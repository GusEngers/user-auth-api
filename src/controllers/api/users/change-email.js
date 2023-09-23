const User = require('../../../models/user');
const { STATUS_INACTIVE } = require('../../../utils/constants');

async function changeEmail({ _id, api_key, email }) {
  try {
    const user = await User.findOne({ _id, api_key });
    if (!user) {
      throw { message: 'Usuario no encontrado', status: 404 };
    }
    if (user.status === STATUS_INACTIVE) {
      throw { message: 'El usuario se encuentra inactivo', status: 400 };
    }
    user.email = email;
    await user.save();
    return { msg: 'Se actualizó el e-mail del usuario', user };
  } catch (error) {
    throw error;
  }
}

module.exports = changeEmail;
