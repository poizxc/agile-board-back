const { Router } = require('express');
const asyncRoute = require('../middlewares/asyncRoute');
const { models } = require('../providers/db');
const validator = require('../middlewares/requestValidator');
const { errors } = require('../helpers/Errors');
const { regexPatterns } = require('../config/constants');
const {
  issuePostSchema,
  issuePutSchema,
  issuePatchSchema,
  issueDeleteSchema,
} = require('../schemas/issues');
const populateWithDummyData = require('../helpers/dummyData');

const IssueRouter = new Router();

IssueRouter.get(
  '/',
  asyncRoute(async (req, res) => res.send(await models.issue.findAll())),
);

IssueRouter.get(
  `/:uuid(${regexPatterns.uuid})`,
  asyncRoute(async (req, res) => {
    const issue = await models.issue.findByPk(req.params.uuid);
    if (!issue) throw errors.notFound();
    return res.send(issue);
  }),
);

IssueRouter.post(
  '/',
  validator(issuePostSchema),
  asyncRoute(async (req, res) =>
    res.status(201).send(await models.issue.create(req.body)),
  ),
);

IssueRouter.put(
  `/:uuid(${regexPatterns.uuid})`,
  validator(issuePutSchema),
  asyncRoute(async (req, res) => {
    const result = await models.issue.update(req.body, {
      where: { uuid: req.params.uuid },
    });
    const isUpdated = result[0] === 1;
    return isUpdated ? res.send('updated') : res.sendStatus(404);
  }),
);

IssueRouter.patch(
  `/:uuid(${regexPatterns.uuid})`,
  validator(issuePatchSchema),
  asyncRoute(async (req, res) => {
    const result = await models.issue.update(req.body, {
      where: { uuid: req.params.uuid },
    });
    const isUpdated = result[0] === 1;
    return isUpdated ? res.send('updated') : res.sendStatus(404);
  }),
);

IssueRouter.delete(
  `/:uuid(${regexPatterns.uuid})`,
  validator(issueDeleteSchema),
  asyncRoute(async (req, res) => {
    const result = await models.issue.destroy({
      where: { uuid: req.params.uuid },
    });
    return result ? res.send('deleted') : res.sendStatus(404);
  }),
);

// this is here only because i hosted this app, check README for more info
IssueRouter.delete(
  '/_/reset-db',
  asyncRoute(async (req, res) => {
    await models.issue.destroy({
      where: {},
      truncate: true,
    });
    await populateWithDummyData(models.issue);
    res.sendStatus(200);
  }),
);
module.exports = IssueRouter;
