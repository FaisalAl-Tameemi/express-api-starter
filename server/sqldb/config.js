

const dev_configs = require('../config/environment/development');
const test_configs = require('../config/environment/test');
const prod_configs = require('../config/environment/production');

module.exports = {
  development: dev_configs.sequelize,
  test: test_configs.sequelize,
  production: prod_configs.sequelize,
};
