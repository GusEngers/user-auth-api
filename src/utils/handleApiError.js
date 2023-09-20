module.exports = (response, status, errors) =>
  response.status(status).json({ status, errors });
