const Joi = require('@hapi/joi');
const { issuesStatues } = require('../config/constants');

const issuePostSchema = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string()
      .valid(...issuesStatues)
      .required(),
    estimate: Joi.number().integer().min(0).required(),
  },
};

const issuePutSchema = {
  body: {
    title: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string()
      .valid(...issuesStatues)
      .required(),
    estimate: Joi.number().integer().min(0).required(),
  },
  params: {
    uuid: Joi.string().uuid().required(),
  },
};

const issuePatchSchema = {
  body: {
    status: Joi.string()
      .valid(...issuesStatues)
      .required(),
  },
  params: {
    uuid: Joi.string().uuid().required(),
  },
};

const issueDeleteSchema = {
  params: {
    uuid: Joi.string().uuid().required(),
  },
};

module.exports = {
  issuePostSchema,
  issuePutSchema,
  issuePatchSchema,
  issueDeleteSchema,
};
