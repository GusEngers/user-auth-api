'use strict';
const express = require('express');
const { connect } = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const { PORT, MONGO_URI } = process.env;

// Routes import
// Api_key
const api_key = require('./routes/api_key/api_key');
// Users
const register = require('./routes/register.js');
const login = require('./routes/login.js');
const protected_token = require('./routes/protected_token.js');
const verifyToken = require('./controllers/users/verifyToken.js');
const users = require('./routes/users.js');
const deleteUser = require('./routes/delete.js');
const recovery = require('./routes/recovery.js');
const apikeyVerification = require('./middlewares/apikey_verification');

const app = express();
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
// Api_key
app.use('/api_key', api_key);
app.use('/users/register', register);
app.use('/users/login', login);
app.use('/users/protected', apikeyVerification, verifyToken, protected_token);
app.use('/users', users);
app.use('/delete', deleteUser);
app.use('/recovery', recovery);

// Connection
connect(MONGO_URI)
  .then(() => {
    console.info('Database connected!');
    app.listen(PORT, () => {
      console.log(`Server start on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connection database:\n', error);
  });
