'use strict';
const { Router } = require('express');
const router = Router();
const { verificationApiKey } = require('../controllers/api_key/verificationApiKey.js');
const { recoveryUser } = require('../controllers/users/recovery.js');

router.put('/user', async (req, res) => {
	const { api_key, id } = req.query;
	try {
		if(await verificationApiKey(api_key)) {
			let data = await recoveryUser(api_key, id);
			res.json({
				data
			});
		};
	} catch (error) {
		res.status(400).json({error: error.message});
	};
});

module.exports = router;