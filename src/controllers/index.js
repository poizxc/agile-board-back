const path = require('path');
const fs = require('fs');
const logger = require('../helpers/logger');

module.exports = {
  init: (app) => {
    const routePath = path.resolve(__dirname);
    fs.readdirSync(routePath).forEach((file) => {
      if (file !== 'index.js') {
        const fileWithoutExt = file.substr(0, file.indexOf('.'));
        const cleanPath = `${routePath}/${fileWithoutExt}`;
        const route = path.resolve(cleanPath);
        logger.info(`added routes for /${fileWithoutExt}`);
        // eslint-disable-next-line global-require, import/no-dynamic-require
        app.use(`/api/v1/${fileWithoutExt}`, require(route));
      }
    });
  },
};
