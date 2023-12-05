module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
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

      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

      is_ifce: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },

      telephone: {
        type: Sequelize.STRING,
        allowNull: true
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      permissions_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'permissions'
          },
          key: 'id'
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      campus_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'campi'
          },
          key: 'id'
        },
        allowNull: true,
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
  }
};
