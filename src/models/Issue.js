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
      title: 'HODOR IPSUM',
      description: ` HODOR HODOR! Hodor? Hodor, hodor. Hodor. hodor\
        HODOR! Hodor. Hodor`,
      status: 'TODO',
      estimate: 1,
    });
    Issue.create({
      title: 'BACON IPSUM',
      description: `Bacon ipsum dolor amet flank pork loin brisket\
        burgdoggen meatball sausage jerky buffalo. `,
      status: 'CLOSED',
      estimate: 5,
    });
    Issue.create({
      title: 'OFFICE IPSUM',
      description: `This is our north star design. I dont care if you got some copy,\
        why you dont use officeipsum com or something like that ?. `,
      status: 'PENDING',
      estimate: 3,
    });
    Issue.create({
      title: 'CAT IPSUM',
      description: `Cat cat moo moo lick ears lick paws chew foot head nudges .\
       Intently stare at the same spot murr i hate humans they are so annoying \
       let me in let me out`,
      status: 'TODO',
      estimate: 2,
    });
    Issue.create({
      title: 'CUPCAKE IPSUM',
      description: `Wafer cheesecake oat cake cupcake pudding. Chocolate bar \
      jelly-o chocolate bar dragée. Jelly cookie marzipan bonbon sweet.`,
      status: 'PENDING',
      estimate: 2,
    });
    Issue.create({
      title: 'ZOMBIE IPSUM',
      description: `Zombie ipsum brains reversus ab cerebellum viral inferno, \
      brein nam rick mend grimes .`,
      status: 'TODO',
      estimate: 8,
    });
    logger.info('table issues created');
  })
  .catch((e) => logger.error(e));
module.exports = Issue;
