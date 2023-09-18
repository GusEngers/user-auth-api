const ApiKey = require('../../models/api-key');

async function verifyEmail(req, res, next) {
  try {
    if (!req.body.email) {
      return res.render('home', {
        error: 'Los datos del email son necesarios',
        info: null,
      });
    }

    const reg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!reg.test(req.body.email)) {
      return res.render('home', {
        error: 'El e-mail ingresado no tiene un formato válido',
        info: null,
      });
    }

    const api = await ApiKey.findOne({ email: req.body.email });
    if (!api) {
      return next();
    }
    return res.render('home', {
      error: null,
      info: 'Aparentemente ya posees una api-key, te la volvimos a enviar. ¡Revisa tu correo!',
    });
  } catch (error) {
    return res.render('home', {
      error: error.message,
      info: null,
    });
  }
}

module.exports = verifyEmail;
