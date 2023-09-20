const handleApiError = require('../../utils/handleApiError');

function verifyBody(req, res, next) {
  const errors = [];
  if (!req.body.email) {
    errors.push('Los datos del e-mail son necesarios');
  }

  const email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (req.body.email && !email.test(req.body.email)) {
    errors.push('El e-mail ingresado no tiene un formato válido');
  }

  if (!req.body.password) {
    errors.push('Los datos de la contraseña son necesarios');
  }

  const password = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (req.body.password && !password.test(req.body.password)) {
    errors.push(
      'La contraseña debe tener letras, números y un mínimo de 8 caracteres'
    );
  }

  if (!errors.length) {
    return next();
  }
  return handleApiError(res, 400, errors);
}

module.exports = verifyBody;
