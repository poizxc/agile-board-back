const Sequalize = require('sequelize');
const {
  isDev,
  pg: { host, user, database, password, port },
} = require('../config/config');
const Issue = require('../models/Issue');
const logger = require('../helpers/logger');

const sequelize = new Sequalize(database, user, password, {
  host,
  port,
  dialect: 'postgres',
  logging: isDev,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
});
(async function loadModels() {
  try {
    await Issue(sequelize);
    logger.info('models loaded');
  } catch (error) {
    logger.error('cannot load models', error);
  }
})();

module.exports = sequelize;
