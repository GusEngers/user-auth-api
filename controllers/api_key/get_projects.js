const ApiKey = require('../../models/api_key');

/**
 * Verifica si existe en la base de datos el owner solicitado
 * @param { string } email Email del owner
 * @returns { Promise<boolean> } false si no existe el owner - true si existe el owner
 */
async function existsOwner(email) {
  const owner = await ApiKey.findOne({ email });
  if (!owner) return false;
  return true;
}

/**
 * Obtiene una lista de proyectos del owner indicado por email
 * @param { string } email Email del owner
 * @returns { Promise<[]> } Lista de proyectos vinculados al email
 */
async function getProjects(email) {
  if (!email) throw new Error('Error: Missing Parameter!');
  if (!await existsOwner(email)) throw new Error('Error: Owner not exists!');

  const projects = await ApiKey.find({ email }).select('-_id -__v');
  return projects;
}

module.exports = getProjects;
