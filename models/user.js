const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	api_key: {
		type: String,
		required: true
	},
	status: {
		type: String,
		lowercase: true,
		enum: ['active', 'inactive'],
		default: 'active'
	},
	date: {
		type: String
	},
	data: {
		type: Object,
		default: {
			body: 'empty'
		}
	}
});

module.exports = mongoose.model('user', dataSchema);