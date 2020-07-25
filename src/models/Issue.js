const { DataTypes } = require('sequelize');
const logger = require('../helpers/logger');
const db = require('../providers/db');
const constants = require('../config/constants');
const { checkIfIssueCantBeUpdated } = require('../utils');
const { errors } = require('../helpers/Errors');

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
      isIn: constants.issuesStatues,
    },

    estimate: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    hooks: {
      beforeBulkUpdate: async (nextIssue) => {
        if (nextIssue.where.uuid) {
          const result = await Issue.findByPk(nextIssue.where.uuid);
          if (!result) {
            return Promise.reject(errors.notFound(`issue not exist`));
          }
          if (
            checkIfIssueCantBeUpdated(
              result.dataValues.status,
              nextIssue.attributes.status,
            )
          ) {
            return Promise.reject(
              errors.badRequest(
                `status: ${result.dataValues.status}  can't be changed to ${nextIssue.attributes.status}`,
              ),
            );
          }
        }
        return true;
      },
    },
    schema: 'public',
  },
);

Issue.sync({ force: true })
  .then(() => {
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
    Issue.create({
      title: 'test2',
      description: 'testDESC2',
      status: 'PENDING',
      estimate: 3,
    });
    Issue.create({
      title: 'test3',
      description: 'testDESC3',
      status: 'TODO',
      estimate: 2,
    });
    logger.info('table issues created');
  })
  .catch((e) => logger.error(e));
module.exports = Issue;
