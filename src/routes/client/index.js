const router = require('express').Router();
const generateApiKey = require('../../controllers/client/generate-api-key');
const verifyEmail = require('../../middlewares/client/verify-email');

router
  .route('/')
  .get((req, res) => {
    res.render('home', { error: null, info: null });
  })
  .post(verifyEmail, async (req, res) => {
    try {
      const info = await generateApiKey({ email: req.body.email });
      res.render('home', { error: null, info });
    } catch (error) {
      res.render('home', { error: error.message, info: null });
    }
  });

module.exports = router;
