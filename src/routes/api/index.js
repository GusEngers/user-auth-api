const router = require('express').Router();
const { LINKS_API } = require('../../utils/constants');
const user = require('./user');
const auth = require('./auth');

router.use('/user', user);
router.use('/auth', auth);

router.get('/*', (req, res) => {
  res.status(404).json({
    msg: 'La ruta a la que intenta acceder no existe',
    status: 404,
    links: LINKS_API
  });
});

module.exports = router;
