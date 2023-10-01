module.exports = (req, res) => {
  const { LINKS_API } = require('./constants');

  if(req.originalUrl.substring(0, 5) === '/api/') {
    return res.status(404).json({
      msg: 'La ruta a la que intenta acceder no existe',
      status: 404,
      links: LINKS_API,
    });
  }

  res.render('not-found');
};
