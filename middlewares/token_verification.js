const jwt = require('jsonwebtoken');
require('dotenv').config();
const { TOKEN } = process.env;

function tokenVerification(req, res, next) {
  const token = req.header('auth-token');
  if (!token) res.status(500).send('Error: Access denied!');
  try {
    const verified = jwt.verify(token, TOKEN);
    req.user = verified;
    next();
  } catch (error) {
    res.status(500).send('Error: Invalid token!');
  }
}

module.exports = tokenVerification;
