'use strict';
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const generate = require('./routes/generate.js');
const register = require('./routes/register.js');
const login = require('./routes/login.js');
const protected_token = require('./routes/protected_token.js');
const verifyToken = require('./controllers/users/verifyToken.js');
const users = require('./routes/users.js');
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
app.use('/register', register);
app.use('/login', login);
app.use('/protected', verifyToken, protected_token);
app.use('/users', users);

app.listen(process.env.PORT, () => {
	console.log(`Server start on port: ${process.env.PORT}`);
});

