const { Schema, model } = require('mongoose');

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
