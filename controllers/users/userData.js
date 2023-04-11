'use strict';
const User = require('../../models/user.js');
const { dataUser } = require('./usersList.js');

const userData = async (id) => {
  const data = await User.findById(id);
  if (!data) throw new Error('User not found!');
  return dataUser(data);
};

module.exports = userData;
