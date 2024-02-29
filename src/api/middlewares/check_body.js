const { REGEX_EMAIL, REGEX_PASSWORD } = require('../../utils/constants');
const { ResponseError } = require('../../utils/error.class');

/**
 * @description Verifica si los datos necesarios para los controladores de autenticación son correctos
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function checkAuthBody(req, res, next) {
  const { email, password } = req.body;
  let errors = [];
  // Verificar la sección de email
  if (!email) {
    errors.push('Required email');
  }
  if (email && !REGEX_EMAIL.test(email)) {
    errors.push('Invalid email format');
  }
  // Verificar la sección de contraseña
  if (!password) {
    errors.push('Required password');
  }
  if (password && !REGEX_PASSWORD.test(password)) {
    errors.push('Invalid password format');
  }
  // Verificar si hay errores
  if (!errors.length) return next();
  next(new ResponseError('Invalid data received', 403, errors));
}

/**
 * @description Verifica si los datos necesarios para modificar un usuario son correctos
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function checkUserBody(req, res, next) {
  const { email, password } = req.body;
  let errors = [];
  // Verificar la sección de email
  if (email && !REGEX_EMAIL.test(email)) {
    errors.push('Invalid email format');
  }
  // Verificar la sección de contraseña
  if (password && !REGEX_PASSWORD.test(password)) {
    errors.push('Invalid password format');
  }
  // Verificar si faltan ambas secciones
  if (!email && !password) {
    errors.push('Required email or password data');
  }
  // Verificar si hay errores
  if (!errors.length) return next();
  next(new ResponseError('Invalid data received', 403, errors));
}

/**
 * @description Verifica si los datos necesarios para los controladores de API-KEY son correctos
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function checkApiKeyBody(req, res, next) {
  const { email, password, project } = req.body;
  let errors = [];
  // Verificar la sección de email
  if (!email) {
    errors.push('Required email');
  }
  if (email && !REGEX_EMAIL.test(email)) {
    errors.push('Invalid email format');
  }
  // Verificar la sección de contraseña
  if (!password) {
    errors.push('Required password');
  }
  if (password && !REGEX_PASSWORD.test(password)) {
    errors.push('Invalid password format');
  }
  // Verificar nombre del proyecto
  if (!project) {
    errors.push('Required name project');
  }
  if (project && (typeof project !== 'string' || project.length <= 0)) {
    errors.push('Invalid name project');
  }
  // Verificar si hay errores
  if (!errors.length) return next();
  next(new ResponseError('Invalid data received', 403, errors));
}

module.exports = { checkAuthBody, checkUserBody, checkApiKeyBody };
