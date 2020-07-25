const Joi = require('@hapi/joi');
const { errors } = require('../helpers/Errors');

module.exports = (schema) => (req, res, next) => {
  const JoiSchema = Joi.object({
    body: {},
    query: {},
    params: {},
    ...schema,
  });

  const requestToValidate = {
    body: req.body,
    query: req.query,
    params: req.params,
  };

  const result = JoiSchema.validate(requestToValidate);

  return result.error
    ? next(errors.badRequest(result.error.details[0].message))
    : next();
};
