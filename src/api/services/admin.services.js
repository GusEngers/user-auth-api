const { DAY, WEEK, MONTH, STATUS_ACTIVE } = require('../../utils/constants');
const { ResponseError } = require('../../utils/error.class');
const User = require('../models/user');

/**
 * @description Obtiene una lista de usuarios registrados dentro del último mes, semana o día
 * @param {string} api_key API-KEY del cliente
 * @param {string} type Filtro de fecha `'day'`, `'week'` o `'month'`
 * @param {number} omit Número de resultados omitidos
 * @param {number} limit Límite resultados por consulta
 */
async function getRegister(api_key, type = DAY.name, omit = 0, limit = 10) {
  const now = new Date().getTime();
  // Obtener registros del último día
  if (type.toLowerCase() === DAY.value) {
    const day = new Date(now - DAY.value);
    const users = await User.find({ api_key, status: STATUS_ACTIVE, register_date: { $gte: day } })
      .select('-password -api_key').skip(omit).limit(limit).lean();
    if (!users.length) throw new ResponseError('Users not found', 404);
    return users;
  }
  // Obtener registros de la última semana
  if (type.toLowerCase() === WEEK.value) {
    const week = new Date(now - WEEK.value);
    const users = await User.find({ api_key, status: STATUS_ACTIVE, register_date: { $gte: week } })
      .select('-password -api_key').skip(omit).limit(limit).lean();
    if (!users.length) throw new ResponseError('Users not found', 404);
    return users;
  }
  // Obtener registros del último mes
  if (type.toLowerCase() === MONTH.value) {
    const month = new Date(now - MONTH.value);
    const users = await User.find({ api_key, status: STATUS_ACTIVE, register_date: { $gte: month } })
      .select('-password -api_key').skip(omit).limit(limit).lean();
    if (!users.length) throw new ResponseError('Users not found', 404);
    return users;
  }
}

module.exports = { getRegister };
