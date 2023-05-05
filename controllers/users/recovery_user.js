'use strict';
const User = require('../../models/user.js');

/**
 * Recupera al usuario si se encuentra con un borrado lógico
 * @param { string } id Id del usuario
 * @param { string } api_key Api-Key
 * @returns { Promise<string> } Mensaje de cuenta recuperada
 */
async function recoveryUser(id, api_key) {
  const user = await User.findOneAndUpdate(
    { id, api_key, status: 'inactive' },
    { status: 'active' }
  );
  if (!user) throw new Error('Error: User not found or not inactive!');
  return `${user.name}'s account has been recovered!`;
}

module.exports = {
  recoveryUser,
};
