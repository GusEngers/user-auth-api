const { Schema, model } = require('mongoose');

/**
 * @description Modelo para administrar API-KEY's
 */
const ApiKey = model(
  'api-key',
  new Schema({
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
  })
);

module.exports = ApiKey;
