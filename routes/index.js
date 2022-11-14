const User = require('../models/user.js');
const Api_Key = require('../models/api_key.js');
const mongoose = require('mongoose'); 
const { Router } = require('express');
const router = Router();
const moment = require('moment');
const validationReg = require('../controllers/validationReg.js')


router.get('/', async (req, res) => {
	try {
		const data = await User.find({});
		res.json({data: data});
	} catch (error) {
		res.status(400).json({error: error.message});
	};
});

router.post('/', async (req, res) => {
	try {
		const data = await validationReg(req.query.api_key, req.body.name, req.body.email, req.body.password);
		if(data) {
			let now = moment().format('D-M-YYYY, h:mm:ss');
			const fi = await Api_Key.findById(req.query.api_key);
			const data = {
				...req.body,
				api_key: fi._id,
				date: now
			}
			await User.create(data);
			res.status(201).json({data: `${req.body.name} sucesfully created!`});
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