const express = require('express');
const path = require('path');
const handleCors = require('./utils/handleCors');
const handleError = require('./utils/handleError');
const handleNotFound = require('./utils/handleNotFound');
const handleHeaderApiKey = require('./utils/handleHeaderApiKey');
const client = require('./routes/client');
const api = require('./routes/api');
const ApiKey = require('./models/api-key');
const User = require('./models/user');
const { isProduction } = require('./utils/constants');

const app = express();

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(require('morgan')('dev'));

if (isProduction()) {
  process.stdout.write('[INFO] Dev mode enabled\n');

  app.get('/todos', async (req, res) => {
    const api_keys = await ApiKey.find({});
    const users = await User.find({});
    res.json({ api_keys, users });
  });
  
  app.get('/borrar', async (req, res) => {
    await ApiKey.deleteMany({});
    await User.deleteMany({});
    res.json('Todo eliminado');
  });
}

app.use('/', client);
app.use('/api', handleCors, handleHeaderApiKey, api);

app.use(handleError);
app.use(handleNotFound);

module.exports = app;
