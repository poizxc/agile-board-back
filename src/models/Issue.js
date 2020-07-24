const { DataTypes } = require('sequelize');
const logger = require('../helpers/logger');
const db = require('../providers/db');
const constants = require('../config/constants');

const Issue = db.define(
  'issue',
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      isIn: [...constants.issuesStatues],
    },
    estimate: {
      type: DataTypes.INTEGER,
    },
  },
  {
    schema: 'public',
  },
);

Issue.sync({ force: true })
  .then(() => {
    logger.info('table issues created');
    Issue.create({
      uuid: '2389f56b-bed3-47d6-b0f2-277a7fb7b8c0',
      title: 'test',
      description: 'testDESC',
      status: 'TODO',
      estimate: 1,
    });
    Issue.create({
      title: 'test1',
      description: 'testDESC1',
      status: 'CLOSED',
      estimate: 5,
    });
  })
  .catch((e) => logger.error(e));
module.exports = Issue;
