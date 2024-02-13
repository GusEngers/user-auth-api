const express = require('express');
const path = require('path');
const handleCors = require('./utils/handleCors');
const handleError = require('./utils/handleError');
const handleNotFound = require('./utils/handleNotFound');
const handleHeaderApiKey = require('./utils/handleHeaderApiKey');
const client = require('./routes/client');
const api = require('./routes/api');

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'client', 'public')));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');
app.use(require('morgan')('dev'));

app.use('/', client);
app.use('/api', handleCors, handleHeaderApiKey, api);

app.use(handleError);
app.use(handleNotFound);

module.exports = app;
