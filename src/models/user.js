const { Schema, model } = require('mongoose');

const User = model(
  'user',
  new Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      lowercase: true,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    api_key: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    register_date: {
      type: Date,
      default: Date.now(),
    },
    data: { type: Schema.Types.Mixed },
  })
);

module.exports = User;
