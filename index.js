'use strict';
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const generate = require('./routes/generate.js');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// -- DB Connect --
mongoose.connect(process.env.URL_DB);
const database = mongoose.connection;

database.on('error', (error) => {
	console.log(`Database failed connected: ${error}`);
});
database.once('connected', () => {
	console.log('Database connected!');
});

// --	Routes --
app.use('/', routes);
app.use('/generate', generate);

app.listen(process.env.PORT, () => {
	console.log(`Server start on port: ${process.env.PORT}`);
});

