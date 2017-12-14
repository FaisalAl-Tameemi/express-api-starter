'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .bulkInsert('users', [
          {
            id: 'f3912e87-42da-4f67-92a2-006effb53396',
            provider: 'local',
            name: 'Test usr',
            email: 'test@test.com',
            password: 'test'
          },
          {
            id: 'abc12e87-42da-8f67-92a2-006effb53123',
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin'
          }
        ],
        {})
      .catch(console.error)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', {})
  }
};
