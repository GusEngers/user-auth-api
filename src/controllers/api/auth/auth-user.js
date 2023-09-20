const User = require('../../../models/user');
const { STATUS_INACTIVE } = require('../../../utils/constants');

async function authUser({ _id, api_key }) {
  try {
    const user = await User.findOne({ _id, api_key });
    if (!user) {
      throw new Error('El usuario no existe');
    }
    if (user.status === STATUS_INACTIVE) {
      throw new Error('El usuario está inactivo');
    }
    return 'El usuario está autorizado';
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = authUser;
