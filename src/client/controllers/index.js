const { axios } = require('../../utils/axios');

/**
 * @description Controlador para la página de inicio
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function homePage(req, res, next) {
  const { newApi, contact, error } = req.query;
  if (error === 'true') {
    return res.render('pages/home', { info: null, error: 'Error al generar la API-KEY' });
  }
  if (newApi === 'true') {
    return res.render('pages/home', { info: '¡API Key generada! Revisa tu correo', error: null });
  }
  if (contact === 'true') {
    return res.render('pages/home', { info: '¡Correo enviado! Muchas gracias', error: null });
  }
  res.render('pages/home', { info: null, error: null });
}

/**
 * @description Controlador para redireccionar a la página de documentación
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function docsPage(req, res, next) {
  res.redirect('https://documenter.getpostman.com/view/24779129/2s93eX1spC');
}

/**
 * @description Controlador para redireccionar a la página de documentación
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function contactMessage(req, res, next) {
  try {
    const subject = 'Contacto desde User-Auth-Api';
    await axios.post(`/send/contacto?subject=${subject}`, req.body).catch((e) => {
      throw new Error(e);
    });
    res.render('pages/home');
  } catch (error) {
    res.render('pages/error', { error: error.message });
  }
}

module.exports = {
  homePageController: [homePage],
  docsPageController: [docsPage],
  contactController: [contactMessage],
};
