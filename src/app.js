require('dotenv').config();

const express = require('express');

const reqID = require('./middlewares/reqID');
const requestLogger = require('./middlewares/requestLogger');
const reqTime = require('./middlewares/reqTime');
const errorHandler = require('./middlewares/errorHandler');
const { isDev, port } = require('./config/config');
const controllers = require('./controllers');
const logger = require('./helpers/logger');
const db = require('./providers/db');
const disableCors = require('./middlewares/disableCors');
// Express APP config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom middlewares
app.use(reqID, reqTime, requestLogger);
if (isDev) {
  app.use(disableCors);
}

// API Endpoints
controllers.init(app);

app.use(errorHandler);

db.authenticate()
  .then(async () => {
    const server = app.listen(port, () => {
      logger.info(`App is running on http://localhost:${port} `);
    });
    module.exports = server;
  })
  .catch(() => logger.error('cannot establish connection to database'));
