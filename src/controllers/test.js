const { Router } = require('express');
const Joi = require('@hapi/joi');
const validator = require('../middlewares/requestValidator');

const testRouter = new Router();

testRouter.get(
  '/greet',
  validator({
    query: {
      name: Joi.string().required(),
    },
  }),
  (req, res) => {
    res.send(`hello ${req.query.name}`);
  },
);

module.exports = testRouter;
