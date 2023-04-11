'use strict';
const User = require('../../models/user.js');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const moment = require('moment');

const verify = Joi.object({
  name: Joi.string().min(6).max(30).required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});

const validationReg = async (name, email, password) => {
  // -- data syntax --
  const { error } = verify.validate({ name, email, password });
  if (error) throw new Error(error.details[0].message);

  // -- email verification --
  const dataEV = await User.findOne({ email });
  if (!!dataEV) throw new Error('Email already exists!');

  return true;
};

const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(pass, salt);
  return password;
};

const register = async (name, email, password, data) => {
  const verification = await validationReg(name, email, password);

  if (verification) {
    let date = moment().format('D-M-YYYY, h:mm:ss');
    const newUser = new User({
      name,
      email,
      password: await hashPassword(password),
      date,
      data,
    });

    await newUser.save();
    return `${name} sucesfully created!`;
  }
};

module.exports = {
  register,
};
