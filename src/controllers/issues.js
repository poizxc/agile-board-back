const { Router } = require('express');
const asyncRoute = require('../middlewares/asyncRoute');
const Issue = require('../models/Issue');
const validator = require('../middlewares/requestValidator');
const { errors } = require('../helpers/Errors');
const { regexPatterns } = require('../config/constants');
const {
  issuePostSchema,
  issuePutSchema,
  issuePatchSchema,
  issueDeleteSchema,
} = require('../schemas/issues');

const IssueRouter = new Router();

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
  validator(issuePostSchema),
  asyncRoute(async (req, res) =>
    res.status(201).send(await Issue.create(req.body)),
  ),
);

IssueRouter.put(
  `/:uuid(${regexPatterns.uuid})`,
  validator(issuePutSchema),
  asyncRoute(async (req, res) => {
    const result = await Issue.update(req.body, {
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
    const result = await Issue.update(req.body, {
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
    const result = await Issue.destroy({
      where: { uuid: req.params.uuid },
      force: true,
    });
    return result ? res.send('deleted') : res.sendStatus(404);
  }),
);
module.exports = IssueRouter;
