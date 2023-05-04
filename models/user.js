const { Schema, model, Types } = require('mongoose');

const dataSchema = new Schema({
  id: {
    type: String || Schema.Types.ObjectId,
    default: new Types.ObjectId(),
  },
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
  api_key: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  data: Schema.Types.Mixed,
});

module.exports = model('user', dataSchema);
