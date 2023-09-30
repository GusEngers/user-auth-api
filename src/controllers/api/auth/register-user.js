const User = require('../../../models/user');
const hashPassword = require('../../hash-password');

async function registerUser({ email, password, admin, data, api_key }) {
  try {
    const pass = await hashPassword(password);
    if (admin) {
      const user = new User({ email, admin, password: pass, api_key });
      await user.save();
      return user;
    }
    const user = new User({ email, password: pass, data, api_key });
    await user.save();
    return user;
  } catch (error) {
    throw {
      message: `Error ocurrido durante el registro: ${error.message}`,
      status: 400,
    };
  }
}

module.exports = registerUser;
