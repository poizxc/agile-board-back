require('dotenv').config();

const express = require('express');
const helmet = require('helmet');

const reqID = require('./middlewares/reqID');
const requestLogger = require('./middlewares/requestLogger');
const reqTime = require('./middlewares/reqTime');
const errorHandler = require('./middlewares/errorHandler');
const { port } = require('./config/config');
const controllers = require('./controllers');
const logger = require('./helpers/logger');
const db = require('./providers/db');
const cors = require('./middlewares/cors');

// Express APP config
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// custom middlewares
app.use(cors, reqID, reqTime, requestLogger);

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
