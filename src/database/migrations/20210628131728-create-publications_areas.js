module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('publications_areas', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      publications_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        references: {
          model: {
            tableName: 'publications'
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
    await queryInterface.dropTable('publications_areas');
  }
};
