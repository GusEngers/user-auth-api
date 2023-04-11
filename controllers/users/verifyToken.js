const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token');
  console.log(token)
  if (!token) res.status(400).json({ error: 'Access denied' });
  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    console.log(verified)
    req.name = verified;
    next();
  } catch (error) {
    error.message = 'Invalid token';
    res.status(400).json({ error: error.message });
  }
};

module.exports = verifyToken;
