const Api_Key = require('../models/api_key.js');

const validationAK = async (api_key) => {
	const data = await Api_Key.findById(api_key);
console.log(!data)
	if(!data) return true;

	return false;
};

module.exports = validationAK;