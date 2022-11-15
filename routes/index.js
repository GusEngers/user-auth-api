const User = require('../models/user.js');
const Api_Key = require('../models/api_key.js');
const mongoose = require('mongoose'); 
const { Router } = require('express');
const router = Router();
const validationReg = require('../controllers/validationReg.js')
const verificationApiKey = require('../controllers/api_key/verificationApiKey.js');


router.get('/', async (req, res) => {
	try {
		if(await verificationApiKey(req.query.api_key)) {
			const data = await User.find({api_key: req.query.api_key});
			
			res.json({
				count: data.length,
				data: data.map( user => {
					return {
						_id: user._id,
						name: user.name,
						email: user.email,
						status: user.status,
						date: user.date,
						data: user.data
					}
				})
			});
		}
	} catch (error) {
		res.status(400).json({error: error.message});
	};
});

router.post('/api_key', async (req, res) => {
	try {
		const data = await Api_Key.create(req.body)
		res.status(201).json({
			message: 'Api Key sucesfully created!',
			key: data._id
		});
	} catch (error) {
		res.status(400).json({error: error.message});
	}
});

module.exports = router;