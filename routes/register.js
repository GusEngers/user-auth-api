'use strict';
const { Router } = require('express');
const router = Router();
const { register } = require('../controllers/users/register.js');
const verificationApiKey = require('../controllers/api_key/verificationApiKey.js');

router.post('/', async (req, res) => {
	const { api_key } = req.query;
	const { name, email, password, data } = req.body;
	try {
		if(await verificationApiKey(api_key)) {
			const info = await register(api_key, name, email, password, data);
			res.status(201).json({
				data: info
			})
		}
	} catch (error) {
		res.status(400).json({error: error.message});
	};
});

module.exports = router;