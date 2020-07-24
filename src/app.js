require('dotenv').config();

const express = require('express');

const reqID = require('./middlewares/reqID');
const requestLogger = require('./middlewares/requestLogger');
const reqTime = require('./middlewares/reqTime');
const errorHandler = require('./middlewares/errorHandler');
const config = require('./config/config');
const controllers = require('./controllers');
const logger = require('./helpers/logger');
const db = require('./providers/db');
// Express APP config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewares
app.use(reqID, reqTime, requestLogger);

// cors off in dev
if (config.isDev) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
  });
}

// API Endpoints
controllers.init(app);

// error handler
app.use(errorHandler);

db.authenticate()
  .then(() => {
    const server = app.listen(config.port, () => {
      logger.info(`App is running on http://localhost:${config.port} `);
    });
    module.exports = server;
  })
  .catch(() => logger.error('cannot establish connection to database'));
