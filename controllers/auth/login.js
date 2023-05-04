'use strict';
const User = require('../../models/user.js');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { TOKEN } = process.env;

const verify = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
});

/**
 * Verifica si los datos ingresados para iniciar sesión son correctos y válidos
 * @param { string } email Email ha verificar 
 * @param { string } password Contraseña ha verificar
 * @param { string } api_key Api-Key
 * @returns { Promise<User> } Si no hay errores devuelve el usuario solicitado
 */
async function validationLogin(email, password, api_key) {
  const { error } = verify.validate({ email, password });
  if (error) throw new Error(`Error: ${error.details[0].message}!`);

  const user = await User.findOne({ email, api_key });
  if (!user) throw new Error("Error: The email doesn't exist!");

  const pass = await bcrypt.compare(password, user.password);
  if (!pass) throw new Error('Error: Invalid password!');

  return user;
}

/**
 * Genera un token de sesión luego de validar los datos ingresados
 * @param { string } email Email del ususario 
 * @param { string } password Contraseña del ususario
 * @param { string } api_key Api-Key
 * @returns { Promise<string> } Si no hay errores devuelve el token de sesión
 */
async function login(email, password, api_key) {
  const { name, id } = await validationLogin(email, password, api_key);

  return jwt.sign({ name, id }, TOKEN, { expiresIn: '31 days' });
}

module.exports = login;
