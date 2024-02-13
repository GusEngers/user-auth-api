const { generateApiKeyService } = require('../services/api-key');

/**
 * Controlador para renderizar la Página Prinicpal de la aplicación
 */
function getApiKey(req, res, next) {
  res.render('pages/home');
}

/**
 * Controlador para generar una nueva ApiKey
 */
async function postApiKey(req, res, next) {
  try {
    const apikey = await generateApiKeyService(req.body.email);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getApiKey: [getApiKey],
  postApiKey: [postApiKey],
};
