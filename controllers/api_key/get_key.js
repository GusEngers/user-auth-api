const ApiKey = require('../../models/api_key');

/**
 * Obtiene la key de un proyecto en específico
 * @param { string } email Email del owner
 * @param { project } project Nombre del proyecto
 * @returns { Promise<string> } Key del proyecto
 */
async function getKey(email, project) {
  if (!email || !project) throw new Error('Error: Missing Parameters!');

  const key = await ApiKey.findOne({ email, project }).select(
    '-_id -email -project -__v'
  );
  if (!key) throw new Error('Error: Project not exists!');
  return key;
}

module.exports = getKey;
