const express = require('express');
const path = require('path');

// MIDDLEWARES
const { handleCors } = require('./utils/cors');
const { handleGlobalError } = require('./utils/error');
const { handleNotFound } = require('./utils/not_found');
const { handleApiKey } = require('./utils/header_api_key');

// RUTAS
const client = require('./client/routes');
const api = require('./api/routes');

const app = express();

// CONFIGURACIÓN DE LA APLICACIÓN
app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'client', 'public')));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/client/views');
app.use(require('morgan')('dev'));

app.use('/', client);
app.use('/v3', handleCors, handleApiKey, api);

app.use(handleGlobalError);
app.use(handleNotFound);

module.exports = app;
