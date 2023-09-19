const bcrypt = require('bcrypt');

async function hashPassword(pass = 'Abcd12345') {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(pass, salt);
  return password;
}

module.exports = hashPassword;
