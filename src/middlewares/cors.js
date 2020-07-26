const { isDev } = require('../config/config');

module.exports = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://poizxc.github.io');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );

  if (isDev) res.header('Access-Control-Allow-Origin', '*');
  next();
};
