const User = require('../models/user.js');
const Joi = require('@hapi/joi');
const validationAK = require('./validationAK.js');

const verify = Joi.object({
	name: Joi.string().min(6).max(30).required(),
	email: Joi.string().required().email(),
	password: Joi.string().min(8).required()
});

const validationReg = async (api_key, name, email, password) => {
	// -- api key verification --
	const dataAK = await validationAK(api_key);
	if(dataAK) throw new Error('The api key is not valid!');

	// -- data syntax --
	const { error } = verify.validate({ name, email, password });
	if(error) throw new Error(error.details[0].message);

	// -- email verification --
	const dataEV = await User.findOne({email});
	if(!!dataEV) throw new Error('Email already exists!');

	return true;
};

module.exports = validationReg;