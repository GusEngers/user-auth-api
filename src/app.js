const express = require('express');
const path = require('path');
const handleCors = require('./utils/handleCors');
const handleError = require('./utils/handleError');
const handleNotFound = require('./utils/handleNotFound');
const client = require('./routes/client');
const api = require('./routes/api');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

if (process.env.NODE_ENV === 'dev') {
  console.log('[INFO] Dev mode enabled');
  app.use(require('morgan')('dev'));
}

app.use('/', client);
app.use('/api', handleCors, api);

app.use(handleError);
app.use(handleNotFound);

module.exports = app;
