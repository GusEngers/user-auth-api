'use strict';
const User = require('../../models/user.js');

/**
 * Realiza un borrado lógico del usuario deseado, aunque continua en la base de datos con un status inactivo
 * @param { string } id Id del usuario
 * @param { string } api_key Api-Key
 * @returns { Promise<string> } Mensaje de usuario eliminado
 */
async function logicalDelete(id, api_key) {
  let user = await User.findOneAndUpdate(
    { id, status: 'active', api_key },
    { status: 'inactive' }
  );
  if (!user) throw new Error('Error: User not found or not active!');
  return `User ${user.name} deleted!`;
}

/**
 * Realiza un borrado definitivo del usuario deseado, por lo cual se elimina de la base de datos
 * @param { string } id Id del usuario
 * @param { string } api_key Api-Key
 * @returns { Promise<string> } Mensaje de usuario eliminado definitivamente
 */
async function definitiveDelete(id, api_key) {
  let user = await User.findOneAndDelete({ id, status: 'inactive', api_key });
  if (!user) throw new Error('Error: User not found or not inactive!');
  return 'User permanently deleted and their records can no longer be accessed!';
}

module.exports = {
  logicalDelete,
  definitiveDelete,
};
