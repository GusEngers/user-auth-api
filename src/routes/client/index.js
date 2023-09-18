const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('home', { error: null, info: null });
});

module.exports = router;
