'use strict';
const { Router } = require('express');
const router = Router();
const { verificationApiKey } = require('../controllers/api_key/verificationApiKey.js');
const verifyUser = require('../controllers/api_key/verifyUser.js');

router.get('/', async (req, res) => {
	const { api_key } = req.query;
	try {
		if(await verificationApiKey(api_key)) {
			if(await verifyUser(api_key, req.name.id)){
				res.json({
					error: null,
					user: req.name
				});
			};
		};
	} catch (error) {
		res.status(400).json({error: error.message});
	};
});

module.exports = router;