'use strict';
const Api_Key = require('../../models/api_key.js');
const { newApiKeyEmail, resendApiKeyEmail } = require('../email/email.js');

const validateEmail = async (email) => {
	const data = await Api_Key.findOne({email});

	if(!!data) {
		await resendApiKeyEmail(email, data._id);
		return data._id;
	}
	return false;
};

const generateApiKey = async (email) => {
	const info = await validateEmail(email);
	if(info === false) {
		let data = await Api_Key.create({email});
		await newApiKeyEmail(email, data._id);
		return data._id;
	}
	return info;
};

module.exports = generateApiKey;