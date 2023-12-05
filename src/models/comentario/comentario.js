const { DataTypes } = require('sequelize');
const { SequelizeDatabaseConnection } = require('../../database/connection');
const Publication = require('../publicacao/publicacao');

const sequelize = SequelizeDatabaseConnection.getConnection();

const Comment = sequelize.define(
  'Comment',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    publications_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'comments',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

Comment.belongsTo(Publication, {
  foreignKey: 'publications_id',
  as: 'publication',
});

Publication.hasMany(Comment, {
  foreignKey: 'publications_id',
  as: 'comments',
});

module.exports = Comment;
