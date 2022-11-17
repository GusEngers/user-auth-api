'use strict';
const { Router } = require('express');
const router = Router();
const { verificationApiKey } = require('../controllers/api_key/verificationApiKey.js');
const { usersList } = require('../controllers/users/usersList.js');
const userData = require('../controllers/users/userData.js');

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

router.get('/:id', async (req, res) => {
	const { id } = req.params;
	const { api_key } = req.query;
	try {
		if(await verificationApiKey(api_key)) {
			let data = await userData(api_key, id);
			await console.log(data)
			res.json({data});
		};
	} catch (error) {
		res.status(400).json({error: error.message});
	};
});

module.exports = router;
