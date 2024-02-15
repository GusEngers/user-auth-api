const { DAY, WEEK, MONTH, STATUS_ACTIVE, STATUS_INACTIVE } = require('../../utils/constants');
const { ResponseError } = require('../../utils/error.class');
const User = require('../models/user');

/**
 * @description Obtiene una lista de usuarios registrados dentro del último mes, semana o día
 * @param {string} api_key API-KEY del cliente
 * @param {string} type Filtro de fecha `'day'`, `'week'` o `'month'`
 * @param {number} omit Número de resultados omitidos
 * @param {number} limit Límite resultados por consulta
 * @returns Lista de usuarios filtrada
 */
async function getRegister(api_key, type = DAY.name, omit = 0, limit = 10) {
  const now = new Date().getTime();
  // Obtener registros del último día
  if (type.toLowerCase() === DAY.value) {
    const day = new Date(now - DAY.value);
    const users = await User.find({ api_key, status: STATUS_ACTIVE, register_date: { $gte: day } })
      .select('-password -api_key')
      .skip(omit)
      .limit(limit)
      .lean();
    if (!users.length) throw new ResponseError('Users not found', 404);
    return users;
  }
  // Obtener registros de la última semana
  if (type.toLowerCase() === WEEK.value) {
    const week = new Date(now - WEEK.value);
    const users = await User.find({ api_key, status: STATUS_ACTIVE, register_date: { $gte: week } })
      .select('-password -api_key')
      .skip(omit)
      .limit(limit)
      .lean();
    if (!users.length) throw new ResponseError('Users not found', 404);
    return users;
  }
  // Obtener registros del último mes
  if (type.toLowerCase() === MONTH.value) {
    const month = new Date(now - MONTH.value);
    const users = await User.find({ api_key, status: STATUS_ACTIVE, register_date: { $gte: month } })
      .select('-password -api_key')
      .skip(omit)
      .limit(limit)
      .lean();
    if (!users.length) throw new ResponseError('Users not found', 404);
    return users;
  }
}

/**
 * @description Cambia el estado de un usuario
 * @param {string} api_key API-KEY del cliente
 * @param {string} _id ID del usuario
 */
async function changeStatus(api_key, _id) {
  const user = await User.findOne({ api_key, _id });
  if (!user) throw new ResponseError('User not found', 404);
  if (user.status === STATUS_ACTIVE) {
    user.status = STATUS_INACTIVE;
    await user.save();
  } else {
    user.status = STATUS_ACTIVE;
    await user.save();
  }
}

module.exports = { getRegister, changeStatus };
