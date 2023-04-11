'use strict';
const User = require('../../models/user.js');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verify = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});

const validationLog = async (email, password) => {
  // -- data syntax --
  const { error } = verify.validate({ email, password });
  if (error) throw new Error(error.details[0].message);

  // -- email verification --
  const dataEV = await User.findOne({ email });
  if (!dataEV) throw new Error('The email does not exist!');

  // -- password verification --
  const dataPV = await bcrypt.compare(password, dataEV.password);
  if (!dataPV) throw new Error('Invalid password!');

  return {
    data: dataEV,
    status: true,
  };
};

const login = async (email, password) => {
  const verification = await validationLog(api_key, email, password);

  if (verification.status) {
    const token = jwt.sign(
      {
        name: verification.data.name,
        id: verification.data._id,
      },
      process.env.TOKEN
    );

    return token;
  }
};

module.exports = {
  login,
};
