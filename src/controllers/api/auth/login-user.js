const User = require('../../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { STATUS_INACTIVE } = require('../../../utils/constants');
require('dotenv').config();

async function loginUser({ email, password, api_key }) {
  try {
    const user = await User.findOne({ email, api_key });
    if (!user) {
      throw {
        message: `El usuario con el e-mail '${email}' no existe`,
        status: 404,
      };
    }
    if (user.status === STATUS_INACTIVE) {
      throw {
        message: `La cuenta vinculada al e-mail '${email}' está inactiva`,
        status: 403,
      };
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw { message: 'La contraseña indicada no coincide', status: 403 };
    }
    return jwt.sign({ _id: user._id, admin: user.admin }, process.env.TOKEN, {
      expiresIn: '31 days',
    });
  } catch (error) {
    throw error;
  }
}

module.exports = loginUser;
