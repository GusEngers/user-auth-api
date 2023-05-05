'use strict';
const User = require('../../models/user.js');

const STATUS = {
  active: 'active',
  inactive: 'inactive',
  all: 'all',
};

/**
 * Obtiene una lista de usuarios según su estado de actividad
 * @param { string } status active | inactive | all
 * @param { string } api_key Api-Key
 * @returns { Promise<[User]> } Lista de usuarios
 */
async function getList(status, api_key) {
  if (!STATUS[status]) throw new Error('Error: Invalid parameter!');
  if (STATUS[status] !== STATUS.all)
    return await User.find({ status: STATUS[status], api_key }).select(
      '-_id -api_key -password -__v'
    );
  return await User.find({ api_key }).select('-_id -api_key -password -__v');
}

/**
 * Obtiene un usuario según su id
 * @param { string } id Id del usuario
 * @param { string } api_key Api-Key
 * @returns { User } Usuario solicitado
 */
async function getUser(id, api_key) {
  if (!id) throw new Error('Error: Invalid parameter!');
  const user = await User.findOne({ id, api_key }).select(
    '-_id -api_key -password -__v'
  );
  if (!user) throw new Error('Error: User not found!');
  return user;
}

module.exports = { getList, getUser };
