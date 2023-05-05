const ApiKey = require('../models/api_key');

/**
 * Verifica si la Api-Key ingresada es válida (existe en la base de datos)
 * @param { string } key Api-Key ha verificar
 */
async function isValid(key) {
  let response = await ApiKey.findOne({ key });
  if (!response) throw new Error("Error: Api Key doesn't exist!");
}

/**
 * Middleware que verifica si se ha ingresado la Api-Key además de verificar si es válida
 * @param { Request } req Petición
 * @param { Response } res Respuesta
 * @param { NextFunction } next Función Next
 */
async function apikeyVerification(req, res, next) {
  const { api_key } = req.query;
  if (!api_key) return res.status(500).send('Error: Api Key required!');
  try {
    await isValid(api_key);
    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

module.exports = apikeyVerification;
