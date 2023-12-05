module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('capas', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      key: {
        type: Sequelize.STRING,
        allowNull: false
      },

      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      publications_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'publications'
          },
          key: 'id'
        },
        unique: true,
        allowNull: false,
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('capas');
  }
};
