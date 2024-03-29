const { ResponseError } = require('../../utils/error.class');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { STATUS_INACTIVE, TOKEN, STATUS_ACTIVE } = require('../../utils/constants');
const { hashPassword } = require('./utils/hash_password');

/**
 * @description Inicia la sesión de un usuario con su email y contraseña
 * @param {string} email Email del usuario
 * @param {string} password Contraseña del usuario
 * @param {string} api_key API-KEY del cliente
 * @returns ID del usuario y token de sesión
 */
async function login(email, password, api_key) {
  // Verificar si el usuario existe
  const user = await User.findOne({ email, api_key });
  if (!user) throw new ResponseError('User not found', 404);
  if (user.status === STATUS_INACTIVE) throw new ResponseError('Inactive user', 403);
  // Verificar si la contraseña es correcta
  const compare = await bcrypt.compare(password, user.password);
  if (!compare) throw new ResponseError('Invalid password', 403);
  // Generar token de sesión
  const token = jwt.sign({ _id: user._id }, TOKEN, { expiresIn: '31 days' });
  return { _id: user._id, token };
}

/**
 * @description Verifica la autenticidad del token de sesión de un usuario
 * @param {string} token Token de sesión del usuario
 * @param {string} api_key API-KEY del cliente
 * @returns ID del usuario y token de sesión
 */
async function auth(token, api_key) {
  // Verificar si se proporciona el token de sesión
  if (!token) throw new ResponseError('Required session token', 403);
  // Decodificar el token
  const decode = jwt.verify(token, TOKEN);
  const user = await User.findOne({ _id: decode._id, api_key });
  // Verificar si el usuario existe y está activo
  if (!user) throw new ResponseError('User not found', 404);
  if (user.status === STATUS_INACTIVE) throw new ResponseError('Inactive user', 403);
  return { _id: user._id, token };
}

/**
 * @description Registra un nuevo usuario con su email y contraseña
 * @param {string} email Email del usuario
 * @param {string} password Contraseña del usuario
 * @param {string} api_key API-KEY del cliente
 * @returns ID del usuario y token de sesión
 */
async function signUp(email, password, api_key) {
  // Verificar si el usuario ya existe
  const user = await User.findOne({ email, api_key });
  if (user && user.status === STATUS_ACTIVE) throw new ResponseError('User already exists', 400);
  // Codificar la contraseña
  const encodePassword = await hashPassword(password);
  // Verificar si el usuario existe pero está inactivo
  if (user && user.status === STATUS_INACTIVE) {
    // Volver a dejarlo activo usando una nueva contraseña
    user.password = encodePassword;
    user.status = STATUS_ACTIVE;
    await user.save();
    // Generar token de sesión
    const token = jwt.sign({ _id: user._id }, TOKEN, { expiresIn: '31 days' });
    return { _id: user._id, token };
  }
  // Registrar el nuevo usuario
  const signUpUser = new User({ email, password: encodePassword, api_key });
  await signUpUser.save();
  // Generar token de sesión
  const token = jwt.sign({ _id: signUpUser._id }, TOKEN, { expiresIn: '31 days' });
  return { _id: signUpUser._id, token };
}

module.exports = { login, auth, signUp };
