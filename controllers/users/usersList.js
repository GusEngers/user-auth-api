'use strict';
const User = require('../../models/user.js');

const usersList = async (api_key, status) => {
	switch (status) {
		case undefined:
		case '':
			return await User.find({api_key});
		case 'active':
			return await User.find({api_key, status});
		case 'inactive':
			return await User.find({api_key, status});
		default:
			throw new Error('An unexpected error has occurred');
	};
};

module.exports = usersList;