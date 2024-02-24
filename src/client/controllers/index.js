/**
 * @description Controlador para la página de inicio
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
function homePage(req, res, next) {
  res.render('pages/home');
}

module.exports = {
  homePageController: [homePage],
};
