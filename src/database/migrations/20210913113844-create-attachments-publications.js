module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('attachments_publication', {
      filename: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      publication_id: {
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'publications',
          },
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('attachments_publications');
  },
};
