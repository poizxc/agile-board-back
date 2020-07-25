const Sequalize = require('sequelize');
const {
  isDev,
  pg: { host, user, database, password, port },
} = require('../config/config');

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
module.exports = sequelize;
