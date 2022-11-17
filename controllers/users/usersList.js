'use strict';
const User = require('../../models/user.js');

const dataUser = (user) => {
	return {
		_id: user._id,
		name: user.name,
		email: user.email,
		status: user.status,
		date: user.date,
		data: user.data
	};
};

const usersList = async (api_key, status) => {
	switch (status) {
		case undefined:
		case '':
			let all = await User.find({api_key});
			return all.map(user => dataUser(user));
		case 'active':
			let active = await User.find({api_key, status})
			return active.map(user => dataUser(user));
		case 'inactive':
			let inactive = await User.find({api_key, status});
			return inactive.map(user => dataUser(user));
		default:
			throw new Error('An unexpected error has occurred');
	};
};

module.exports = usersList;