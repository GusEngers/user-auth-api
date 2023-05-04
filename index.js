'use strict';
const express = require('express');
const { connect } = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors');
const apikeyVerification = require('./middlewares/apikey_verification');
const { PORT, MONGO_URI } = process.env;

// Routes import
const api_key = require('./routes/api_key');
const auth = require('./routes/auth');

const app = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api_key', api_key);
app.use('/auth', apikeyVerification, auth);

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
