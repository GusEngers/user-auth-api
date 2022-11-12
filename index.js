'use strict';
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
	console.log('funcionando')
	res.json({msg: 'hola'})
})

app.listen(process.env.PORT, () => {
	console.log(`Server start on port: ${process.env.PORT}`);
});

