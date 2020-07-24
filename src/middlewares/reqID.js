const { v4: uuid4 } = require('uuid');

module.exports = (req, res, next) => {
  req.id = uuid4();
  next();
};
