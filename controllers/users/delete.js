'use strict';
const User = require('../../models/user.js');

const logicalDelete = async (id) => {
  let data = await User.findByIdAndUpdate(id, { status: 'inactive' });
  if (!data) throw new Error('User not found');
  return 'User deleted';
};

const definitiveDelete = async (id) => {
  let data = await User.findByIdAndDelete(id);
  if (!data) throw new Error('User not found');
  return 'User permanently deleted and their records can no longer be accessed!';
};

module.exports = {
  logicalDelete,
  definitiveDelete,
};
