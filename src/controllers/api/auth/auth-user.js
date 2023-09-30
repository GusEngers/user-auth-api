const User = require('../../../models/user');
const { STATUS_INACTIVE } = require('../../../utils/constants');

async function authUser({ _id, api_key }) {
  try {
    const user = await User.findOne({ _id, api_key });
    if (!user) {
      throw { message: 'El usuario no existe', status: 404 };
    }
    if (user.status === STATUS_INACTIVE) {
      throw { message: 'El usuario está inactivo', status: 400 };
    }
    return 'El usuario está autorizado';
  } catch (error) {
    throw error;
  }
}

module.exports = authUser;
