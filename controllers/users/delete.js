'use strict';
const User = require('../../models/user.js');
const { verificationObjectId } = require('../api_key/verificationApiKey.js');

const logicalDelete = async (api_key, id) => {
	if(!verificationObjectId(id)) throw new Error('Invalid ID');
	let data = await User.findOneAndUpdate({_id: id, api_key}, {status: 'inactive'});
	if(!data) throw new Error('User not found');
	return 'User deleted';
};

const definitiveDelete = async (api_key, id) => {
	if(!verificationObjectId(id)) throw new Error('Invalid ID');
	let data = await User.findOneAndDelete({_id: id, api_key});
	if(!data) throw new Error('User not found');
	return 'User permanently deleted and their records can no longer be accessed!';
};

module.exports = {
	logicalDelete,
	definitiveDelete
};