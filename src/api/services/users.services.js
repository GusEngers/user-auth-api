const { ResponseError } = require('../../utils/error.class');
const User = require('../models/user');

/**
 * @description Obtiene una lista de usuarios de la base de datos
 * @param {string} api_key API-KEY del cliente
 * @param {number} omit Número de resultados omitidos
 * @param {number} limit Límite resultados por consulta
 * @param {string} status Filtro del estado del usuario `'active'` | `'inactive'` | `'all'`
 * @returns Lista de usuarios filtrados
 */
async function getUsers(api_key, omit = 0, limit = 10, status = 'all') {
  // Caso para obtener todos los usuarios
  if (status.toLowerCase() === 'all') {
    const users = await User.find({ api_key }).select('-password -api_key').skip(omit).limit(limit).lean();
    if (!users.length) throw new ResponseError('Users not found', 404);
    return users;
  }
  // Caso para obtener los usuarios según su estado
  const users = await User.find({ api_key, status: status.toLowerCase() }).select('-password -api_key').skip(omit).limit(limit).lean();
  if (!users.length) throw new ResponseError('Users not found', 404);
  return users;
}

/**
 * @description Obtiene los datos de un usuario según su id
 * @param {string} api_key API-KEY del cliente
 * @param {string} _id ID del usuario
 * @returns Datos del usuario
 */
async function getUser(api_key, _id) {
  const user = await User.findOne({ api_key, _id }).select('-password -api_key').lean();
  if (!user) throw new ResponseError('User not found', 404);
  return user;
}

module.exports = { getUsers, getUser };
