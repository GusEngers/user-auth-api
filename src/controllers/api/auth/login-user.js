const User = require('../../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { STATUS_INACTIVE } = require('../../../utils/constants');
require('dotenv').config();

async function loginUser({ email, password, api_key }) {
  try {
    const user = await User.findOne({ email, api_key });
    if (!user) {
      throw new Error(`El usuario con el e-mail '${email}' no existe`);
    }
    if (user.status === STATUS_INACTIVE) {
      throw new Error(`La cuenta vinculada al e-mail '${email}' está inactiva`);
    }
    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      throw new Error('La contraseña indicada no coincide');
    }
    return jwt.sign({ _id: user._id, admin: user.admin }, process.env.TOKEN, {
      expiresIn: '31 days',
    });
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = loginUser;
