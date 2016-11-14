'use strict';

// Development specific configuration
// ==================================
module.exports = {

  // Sequelize connecton opions
  sequelize: {
		username: 'development',
    password: 'development',
    database: 'postgres', // db name
		host: '127.0.0.1', 		// i.e. localhost
    dialect: 'postgres',	// type of db
		makeUri: function(){
			return `postgres://${this.username}:${this.password}@localhost:5432/${this.database}`
		},
    options: {
      logging: false,
      // storage: 'dev.sqlite', // ONLY for sqlite
      define: {
        timestamps: false
      }
    }
  },

  // Seed database on startup
  seedDB: false

};
