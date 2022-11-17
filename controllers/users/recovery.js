'use strict';
const User = require('../../models/user.js');
const { verificationObjectId } = require('../api_key/verificationApiKey.js');

const recoveryUser = async (api_key, id) => {
	if(!verificationObjectId(id)) throw new Error('Invalid ID');
	let data = await User.findOneAndUpdate({_id: id, api_key}, {status: 'active'});
	if(!data) throw new Error('User not found');
	if(data.status === 'active') throw new Error('The account is not deleted');
	return 'The account has been recovered';
};

module.exports = {
	recoveryUser
}