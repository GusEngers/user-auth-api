const User = require('../../../models/user');
const { STATUS_INACTIVE } = require('../../../utils/constants');

async function deleteUser({ _id, api_key }) {
  try {
    const user = await User.findOne({ _id, api_key });
    if (!user) {
      throw { message: 'Usuario no encontrado', status: 404 };
    }
    if (user.status === STATUS_INACTIVE) {
      throw { message: 'El usuario ya se encuentra inactivo', status: 400 };
    }
    user.status = STATUS_INACTIVE;
    await user.save();
    return 'El usuario se eliminó satisfactoriamente';
  } catch (error) {
    throw error;
  }
}

module.exports = { deleteUser };
