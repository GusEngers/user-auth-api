const User = require('../../models/user');

/**
 * Verifica si el usuario especificado existe y tenga su status active
 * @param { string } id Id del usuario 
 * @param { string } api_key Api-Key
 */
async function userVerification(id, api_key) {
  const user = await User.findOne({ id, api_key, status: 'active' });
  if (!user) throw new Error('Error: User not found!');
}

module.exports = userVerification;
