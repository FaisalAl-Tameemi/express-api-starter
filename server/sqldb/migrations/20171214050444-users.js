'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: Sequelize.STRING,
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user'
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      provider: Sequelize.STRING,
      salt: Sequelize.STRING,
      facebook: Sequelize.TEXT,
      twitter: Sequelize.TEXT,
      google: Sequelize.TEXT,
      github: Sequelize.TEXT,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
