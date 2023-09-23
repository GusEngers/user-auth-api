const handleApiError = require('./handleApiError');

module.exports = (err, req, res, next) => {
  if (err.type && err.type === 'entity.parse.failed') {
    return handleApiError(res, 400, [
      "El objeto 'body' sólo aceptará como valor un 'Object' o un 'Array'",
    ]);
  }
  res.render('error', { error: err.message });
};
