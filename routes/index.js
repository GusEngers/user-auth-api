const User = require('../models/user.js');
const Api_Key = require('../models/api_key.js');
const mongoose = require('mongoose'); 
const { Router } = require('express');
const router = Router();
const moment = require('moment');


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
		let now = moment().format('D-M-YYYY, h:mm:ss');
		const fi = await Api_Key.findOne({email: "prueba_mail@email.com"});
		const data = {
			...req.body,
			api_key: fi._id,
			date: now
		}
		await User.create(data);
		res.status(201).json({data: `${req.body.name} sucesfully created!`});
	} catch (error) {
		res.status(400).json({error: error.message});
	};
});

module.exports = router;