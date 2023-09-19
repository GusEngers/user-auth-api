const router = require('express').Router();

router.get('/api', (req, res) => {
  res.json('hola');
});

router.get('/*', (req, res) => {
  res.json('ruta inexistente');
});

module.exports = router;
