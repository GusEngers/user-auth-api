'use strict';
const User = require('../../models/user.js');

const verifyUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error('User not exist!');
  return true;
};

module.exports = verifyUser;
