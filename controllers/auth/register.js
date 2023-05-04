'use strict';
const User = require('../../models/user.js');
const Joi = require('joi');
const bcrypt = require('bcrypt');

const verify = Joi.object({
  name: Joi.string().min(6).max(30).required(),
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});

/**
 * Verifica si los datos ingresados para el registro son válidos
 * @param { object } data Objeto con el nombre, email y contraseña
 * @param { string } api_key Api-Key
 * @returns { Promise<void> }
 */
async function validationRegister(data, api_key) {
  const { error } = verify.validate(data);
  if (error) throw new Error(`Error: ${error.details[0].message}!`);

  const email = await User.findOne({ email: data.email, api_key });
  if (!email) return;
  throw new Error('Error: Email already exists!');
}

/**
 * Obtener el hashing de la contraseña
 * @param { string } pass Contraseña a realizar el hash
 * @returns { Promise<string> } Contraseña hasheada
 */
async function hashPassword(pass) {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(pass, salt);
  return password;
}

/**
 * Añade un nuevo usuario a la base de datos luego de pasar el proceso de verificación
 * @param { object } user Objeto con los datos necesarios del nuevo ususario
 * @returns { Promise<string> } Mensaje de éxito al crear el nuevo usuario
 */
async function register(user) {
  const { name, email, password, data, api_key } = user;
  await validationRegister(
    { name, email, password },
    api_key
  );

  const newUser = new User({
    name,
    email,
    password: await hashPassword(password),
    api_key,
    data,
  });

  await newUser.save();
  return `User ${newUser.name} sucesfully created!`;
}

module.exports = register;
