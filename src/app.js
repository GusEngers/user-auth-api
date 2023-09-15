const express = require('express');
const path = require('path');
require('dotenv').config();
// const router = require('./api/routes');

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

// app.use('/', router);

// app.use(handleError);
// app.use(handleNotFound);

module.exports = app;
