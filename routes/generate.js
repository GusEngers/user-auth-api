'use strict';
const { Router } = require('express');
const router = Router();
const generateApiKey = require('../controllers/api_key/generateApiKey.js');

router.post('/', async (req, res) => {
	const { email } = req.body;
	try {
		let data = await generateApiKey(email);
		res.status(201).json({
			message: 'Api Key sucesfully created!',
			key: data
		});
	} catch (error) {
		res.status(400).json({error: error.message});
	}
});

module.exports = router;