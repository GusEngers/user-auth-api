const { Schema, model } = require('mongoose');
const { STATUS_ACTIVE, STATUS_INACTIVE } = require('../utils/constants');

/**
 * @description Modelo para administrar Usuarios
 */
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
      enum: [STATUS_ACTIVE, STATUS_INACTIVE],
      default: STATUS_ACTIVE,
    },
    api_key: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    register_date: {
      type: Date,
      default: Date.now(),
    },
  })
);

module.exports = User;
