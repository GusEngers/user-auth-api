const { JsonWebTokenError } = require('jsonwebtoken');
const { ResponseError } = require('../../utils/error.class');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { STATUS_INACTIVE, TOKEN } = require('../../utils/constants');

/**
 * @description Inicia la sesión de un usuario con su email y contraseña
 * @param {string} email Email del usuario
 * @param {string} password Contraseña del usuario
 * @param {string} api_key API-KEY del cliente
 * @returns ID del usuario y token de sesión
 */
async function login(email, password, api_key) {
  const user = await User.findOne({ email, api_key });
  if (!user) throw new ResponseError('User not found', 404);
  if (user.status === STATUS_INACTIVE) throw new ResponseError('Inactive user', 403);

  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new ResponseError('Invalid password', 403);

  const token = jwt.sign({ _id: user._id }, TOKEN, { expiresIn: '31 days' });
  return { _id: user._id, token };
}

/**
 * @description Verifica la autenticidad del token de sesión de un usuario
 * @param {string} token Token de sesión del usuario
 * @param {string} api_key API-KEY del cliente
 * @returns ID del usuario y token de sesión
 */
async function auth(token, api_key) {}

/**
 * @description Registra un nuevo usuario con su email y contraseña
 * @param {string} email Email del usuario
 * @param {string} password Contraseña del usuario
 * @param {string} api_key API-KEY del cliente
 * @returns ID del usuario y token de sesión
 */
async function signUp(email, password, api_key) {}

module.exports = { login, auth, signUp };
