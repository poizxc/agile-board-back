const { DataTypes } = require('sequelize');
const constants = require('../config/constants');
const { checkIfIssueCanBeUpdated } = require('../utils');
const { errors } = require('../helpers/Errors');
const { isDev } = require('../config/config');
const populateWithDummyData = require('../helpers/dummyData');

const Issue = (db) => {
  const model = db.define(
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
        type: DataTypes.TEXT,
        allowNull: false,
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
            const result = await model.findByPk(nextIssue.where.uuid);
            if (!result) {
              return Promise.reject(errors.notFound(`issue not exist`));
            }
            if (
              !checkIfIssueCanBeUpdated(
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
  db.sync({ force: isDev }).then(() => populateWithDummyData(model));
};
module.exports = Issue;
