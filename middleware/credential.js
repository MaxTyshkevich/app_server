const allowedOrigins = require('../config/allowedOrigins');

const credential = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-control-allow-credentials', true);
  }
  next();
};

module.exports = credential;
