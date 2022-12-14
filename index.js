'use strict';
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const generate = require('./routes/generate.js');
const register = require('./routes/register.js');
const login = require('./routes/login.js');
const protected_token = require('./routes/protected_token.js');
const verifyToken = require('./controllers/users/verifyToken.js');
const users = require('./routes/users.js');
const deleteUser = require('./routes/delete.js');
const recovery = require('./routes/recovery.js');
require('dotenv').config();
const cors = require('cors');

const app = express();

let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
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
// -- default --
app.get('*', (req, res) => {
	res.json({
		info: 'Has ingresado a una ruta inexistente, para más información sobre los endpoints visita el repositorio del proyecto en GitHub',
		url: 'https://github.com/GusEngers/user-auth-api'
	});
});
// -- enpoints --
app.use('/generate', generate);
app.use('/register', register);
app.use('/login', login);
app.use('/protected', verifyToken, protected_token);
app.use('/users', users);
app.use('/delete', deleteUser);
app.use('/recovery', recovery);

app.listen(process.env.PORT, () => {
	console.log(`Server start on port: ${process.env.PORT}`);
});

