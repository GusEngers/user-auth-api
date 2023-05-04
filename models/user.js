const { Schema, model } = require('mongoose');

const dataSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    lowercase: true,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  data: Schema.Types.Mixed,
});

module.exports = model('user', dataSchema);
