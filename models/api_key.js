const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('api_key', dataSchema);