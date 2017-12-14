

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('things', {
    id: {
      type: Sequelize.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: Sequelize.STRING,
    info: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    deleted_at: Sequelize.DATE,
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('things'),
};
