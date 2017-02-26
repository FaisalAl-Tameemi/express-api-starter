import logger from '../../components/utils/logger';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connecton opions
  sequelize: {
    username: 'DB_USERNAME',
    password: 'DB_PASSWORD',
    database: 'DB_NAME', // db name
    host: '127.0.0.1', 		// i.e. localhost
    dialect: 'postgres',	// type of db
    makeUri: function(){
      return `postgres://${this.username}:${this.password}@localhost:5432/${this.database}`
    },
    options: {
      logging: logger.debug, // set to `false` to turn off logging
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: false

};
