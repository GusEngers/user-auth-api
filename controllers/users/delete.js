'use strict';
const User = require('../../models/user.js');

const logicalDelete = async (api_key, id) => {
	let data = await User.findOneAndUpdate({_id: id, api_key}, {status: 'inactive'});
	if(!data) throw new Error('User not found');
	return 'User deleted';
};

const definitiveDelete = async (api_key, id) => {
	let data = await User.findOneAndDelete({_id: id, api_key});
	if(!data) throw new Error('User not found');
	return 'User permanently deleted and their records can no longer be accessed!';
};

module.exports = {
	logicalDelete,
	definitiveDelete
};