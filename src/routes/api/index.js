const router = require('express').Router();
const { LINKS_API } = require('../../utils/constants');
const auth = require('./auth');
const user = require('./user');

router.use('/auth', auth);
router.use('/user', user);

router.get('/*', (req, res) => {
  res.status(404).json({
    msg: 'La ruta a la que intenta acceder no existe',
    status: 404,
    links: LINKS_API
  });
});

module.exports = router;
