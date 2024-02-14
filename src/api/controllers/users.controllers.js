/**
 * @description Controlador para obtener una lista de usuarios
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function getUsers(req, res, next) {
  try {
    
  } catch (error) {
    next(error)
  }
}

/**
 * @description Controlador para obtener un usuario individualmente
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function getUser(req, res, next) {
  try {
    
  } catch (error) {
    next(error)
  }
}

/**
 * @description Controlador para modificar e-mail o contraseña de un usuario individualmente
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function patchUser(req, res, next) {
  try {
    
  } catch (error) {
    next(error)
  }
}

/**
 * @description Controlador para eliminar un usuario individualmente
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function deleteUser(req, res, next) {
  try {
    
  } catch (error) {
    next(error)
  }
}

module.exports = { getUsers, getUser, patchUser, deleteUser };
