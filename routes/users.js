'use strict';
const { Router } = require('express');
const router = Router();
const verificationApiKey = require('../controllers/api_key/verificationApiKey.js');
const usersList = require('../controllers/users/usersList.js');

router.get('/', async (req, res) => {
	const { api_key, status } = req.query;
	try {
		if(await verificationApiKey(api_key)) {
			let data = await usersList(api_key, status);
			res.json({
				count: data.length,
				data
			});
		}
	} catch (error) {
		res.status(400).json({error: error.message});
	};
});

module.exports = router;