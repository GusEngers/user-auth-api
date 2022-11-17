'use strict';
const User = require('../../models/user.js');
const { dataUser } = require('./usersList.js');
const { verificationObjectId } = require('../api_key/verificationApiKey.js');

const userData = async (api_key, id) => {
	if(!verificationObjectId(id)) throw new Error('Invalid ID');
	const data = await User.findOne({api_key, _id: id});
	if(!data) throw new Error('User not found!');
	return dataUser(data);
};

module.exports = userData;