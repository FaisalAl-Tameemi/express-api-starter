
import { User } from '../index'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return User.bulkCreate([
      {
        provider: 'local',
        name: 'Test usr',
        email: 'test@test.com',
        password: 'test'
      },
      {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      }
    ])
  },

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', {}),
};
