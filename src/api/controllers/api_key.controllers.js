const { apiKeyServices } = require('../services');

/**
 * @description Controlador para crear una nueva API-KEY
 * @param {import("express").Request} req Request
 * @param {import("express").Response} res Response
 * @param {import("express").NextFunction} next NextFunction
 */
async function postApiKey(req, res, next) {
  try {
    const { email, project, password } = req.body;
    const { sendEmail } = req.query;
    const api_key = await apiKeyServices.postApiKey(email, project, password);
    if (sendEmail === 'true') {
      await apiKeyServices.sendEmailApiKey(api_key.api_key, email, password);
      return res.redirect('/?new=true');
    }
    res.status(201).json(api_key);
  } catch (error) {
    next(error);
  }
}

module.exports = { postApiKey };
