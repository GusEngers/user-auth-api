const { Schema, model } = require('mongoose');

const dataSchema = new Schema({
  key: {
    type: String,
    required: true,
  },
  project: {
    type: String,
    required: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
});

module.exports = model('api_key', dataSchema);
