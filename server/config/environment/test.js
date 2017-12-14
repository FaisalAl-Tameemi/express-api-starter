'use strict';

// Test specific configuration
// ===========================
module.exports = {
  sequelize: {
    uri: 'pg://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
