'use strict';
const User = require('../../models/user.js');
const { verificationObjectId } = require('./verificationApiKey.js');

const verifyUser = async (api_key, id) => {
	if(!verificationObjectId(id)) throw new Error('Invalid ID');
	const info = await User.find({_id: id, api_key});
	
	if(!info.length) throw new Error('No results with provided api key');
	return true;
};

module.exports = verifyUser;