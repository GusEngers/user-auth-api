const client = require('express').Router();

const { homePageController, docsPageController, contactController } = require('../controllers');

client.route('/').get(homePageController).post(contactController);
client.route('/docs').get(docsPageController);

module.exports = client;
