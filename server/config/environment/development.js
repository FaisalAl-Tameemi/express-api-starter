'use strict';

const DB_PASSWORD = 'database_name';
const DB_USERNAME = 'username';
const DB_PASSWORD = 'password';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connecton opions
  sequelize: {
    uri: `postgres://${DB_USERNAME}:${DB_PASSWORD}@localhost:5432/${DB_NAME}`
    options: {
      logging: true,
      // storage: 'dev.sqlite', // ONLY for sqlite
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: true

};
