'use strict';
const User = require('../../models/user.js');

const recoveryUser = async (id) => {
  let data = await User.findByIdAndUpdate(id, { status: 'active' });
  if (!data) throw new Error('User not found');
  if (data.status === 'active') throw new Error('The account is not deleted');
  return 'The account has been recovered';
};

module.exports = {
  recoveryUser,
};
