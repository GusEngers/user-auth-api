const client = require('express').Router();

const { homePageController, docsPageController } = require('../controllers');

client.route('/').get(homePageController);
client.route('/docs').get(docsPageController);

module.exports = client;
