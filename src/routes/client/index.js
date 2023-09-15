const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home', {ejemplo: "Hola mundo"});
});

module.exports = router;
