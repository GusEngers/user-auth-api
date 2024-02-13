// Servicios
const { signUpService } = require('../services/users');

/**
 * Controlador que registra un nuevo usuario a la base de datos
 */
async function postSignUp(req, res, next) {
  try {
    const user = await signUpService(req.body);
    res.status(201).json({ _id: user._id, email: user.email });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  postSignUp: [postSignUp],
};
