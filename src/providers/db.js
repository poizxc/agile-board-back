const Sequalize = require('sequelize');
const logger = require('../helpers/logger');

const sequelize = new Sequalize(
  process.env.PG_DB,
  process.env.PG_USER,
  process.env.PG_PASS,
  {
    host: process.env.PG_HOST,
    dialect: 'postgres',
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
  },
);
module.exports = sequelize;
