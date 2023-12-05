module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('area_user', {
      user_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      area_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: {
            tableName: 'areas'
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('area_user');
  }
};
