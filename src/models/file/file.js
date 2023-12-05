const { DataTypes } = require('sequelize');
const { SequelizeDatabaseConnection } = require('../../database/connection');
const Publication = require('../publicacao/publicacao');

const sequelize = SequelizeDatabaseConnection.getConnection();

const File = sequelize.define(
  'File',
  {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publication_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'attachments_publications',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

File.removeAttribute('id');

File.belongsTo(Publication, {
  foreignKey: 'publication_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'publication',
});

Publication.hasMany(File, {
  foreignKey: 'publication_id',
  as: 'attachments',
});

module.exports = File;
