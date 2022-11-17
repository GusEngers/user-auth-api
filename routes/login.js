'use strict';
const { Router } = require('express');
const router = Router();
const { login } = require('../controllers/users/login.js');
const { verificationApiKey } = require('../controllers/api_key/verificationApiKey.js');

router.post('/', async (req, res) => {
	const { api_key } = req.query;
	const { email, password } = req.body;
	try {
		if(await verificationApiKey(api_key)) {
			const token = await login(api_key, email, password);
			res.header('auth-token', token).json({token});
		}
	} catch (error) {
		res.status(400).json({error: error.message});
	};
});

module.exports = router;