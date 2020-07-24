const { Router } = require('express');
const Joi = require('@hapi/joi');
const asyncRoute = require('../middlewares/asyncRoute');
const Issue = require('../models/Issue');
const validator = require('../middlewares/requestValidator');
const { regexPatterns } = require('../config/constants');
const { errors } = require('../helpers/Errors');
const { issuesStatues, regexPatterns } = require('../config/constants');

const IssueRouter = new Router();

// todo move joi schemas to external files

IssueRouter.get(
  '/',
  asyncRoute(async (req, res) => res.send(await Issue.findAll())),
);

IssueRouter.get(
  `/:uuid(${regexPatterns.uuid})`,
  asyncRoute(async (req, res) => {
    const issue = await Issue.findByPk(req.params.uuid);
    if (!issue) throw errors.notFound();
    return res.send(issue);
  }),
);

IssueRouter.post(
  '/',
  validator({
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.string()
        .valid(...issuesStatues)
        .required(),
      estimate: Joi.number().required(),
    },
  }),
  asyncRoute(async (req, res) => res.send(await Issue.create(req.body))),
);

IssueRouter.put(
  `/:uuid(${regexPatterns.uuid})`,
  validator({
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.string()
        .valid(...issuesStatues)
        .required(),
      estimate: Joi.number().required(),
    },
    params: {
      uuid: Joi.string().uuid().required(),
    },
  }),
  asyncRoute(async (req, res) => {
    const result = await Issue.update(req.body, {
      where: { uuid: req.params.uuid },
    });
    const isUpdated = result[0] === 1;
    return isUpdated ? res.status(200).send('updated') : res.sendStatus(404);
  }),
);

IssueRouter.patch(
  `/:uuid(${regexPatterns.uuid})`,
  validator({
    body: {
      status: Joi.string()
        .valid(...issuesStatues)
        .required(),
    },
    params: {
      uuid: Joi.string().uuid().required(),
    },
  }),
  asyncRoute(async (req, res) => {
    const result = await Issue.update(req.body, {
      where: { uuid: req.params.uuid },
    });
    const isUpdated = result[0] === 1;
    return isUpdated ? res.status(200).send('updated') : res.sendStatus(404);
  }),
);

IssueRouter.delete(
  `/:uuid(${regexPatterns.uuid})`,
  validator({
    params: {
      uuid: Joi.string().uuid().required(),
    },
  }),
  asyncRoute(async (req, res) => {
    const result = await Issue.destroy({
      where: { uuid: req.params.uuid },
      force: true,
    });
    return result ? res.status(200).send('deleted') : res.sendStatus(404);
  }),
);
module.exports = IssueRouter;
