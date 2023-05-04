const ApiKey = require('../../models/api_key');
let { Types } = require('mongoose');

/**
 * Verifica si el proyecto vinculado al correo ya existe
 * @param { string } project Nombre del proyecto
 * @param { string } email Email del owner
 * @returns { Promise<boolean> } true si el proyecto no existe - false si el proyecto no existe
 */
async function verificationProject(project, email) {
  let response = await ApiKey.findOne({ project, email });
  if (!response) return true;
  return false;
}

/**
 * Genera una nueva Api-Key y la guarda en la base de datos
 * @param { string } email Email del owner
 * @param { string } project Nombre del proyecto
 * @returns { Promise<string> } Api-Key generada
 */
async function generateApiKey(email, project) {
  if (!email || !project) throw new Error('Error: Missing Parameters!');
  if (!(await verificationProject(project, email)))
    throw new Error('Error: Existing Project!');

  let key = new Types.ObjectId();
  let newAK = new ApiKey({ key, email, project });
  await newAK.save();
  return newAK.key;
}

module.exports = generateApiKey;
