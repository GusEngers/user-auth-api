const router = require('express').Router();
const auth = require('./auth');

router.use('/auth', auth);

router.get('/*', (req, res) => {
  res.json('ruta inexistente');
});

module.exports = router;
