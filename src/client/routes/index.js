const client = require('express').Router();

const { homePageController } = require('../controllers');

client.route('/').get(homePageController);

module.exports = client;
