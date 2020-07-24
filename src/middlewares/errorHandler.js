const notifier = require('node-notifier');
const config = require('../config/config');
const { StatusError } = require('../helpers/Errors');

module.exports = (err, req, res, next) => {
  if (config.isDev) {
    notifier.notify({
      title: 'ERROR',
      message: `Occurred on ${req.method} ${req.originalUrl}`,
    });
  }
  if (err instanceof StatusError) {
    res.status(err.statusCode).send(err.userMessage);
  } else {
    next(err);
  }
};
