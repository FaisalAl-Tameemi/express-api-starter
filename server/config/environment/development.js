'use strict';

const DB_NAME = '';
const DB_USERNAME = '';
const DB_PASSWORD = '';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connecton opions
  sequelize: {
    uri: `postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/${DB_NAME}`,
    options: {
      logging: false,
      // storage: 'dev.sqlite', // ONLY for sqlite
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
