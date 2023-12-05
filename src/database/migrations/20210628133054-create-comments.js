module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('comments', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      comments_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'comments'
          },
          key: 'id'
        },
        allowNull: true,
        onDelete: 'CASCADE'
      },
      publications_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'publications'
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'users'
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('comments');
  }
};
