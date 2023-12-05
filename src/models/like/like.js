const { DataTypes } = require('sequelize');
const { SequelizeDatabaseConnection } = require('../../database/connection');
const Publication = require('../publicacao/publicacao');
const User = require('../user/user');

const sequelize = SequelizeDatabaseConnection.getConnection();

const Like = sequelize.define(
  'Like',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
    tableName: 'likes'
  }
);

Like.belongsTo(Publication, {
  foreignKey: 'publications_id',
  as: 'publicação'
});

Publication.hasMany(Like, {
  foreignKey: 'publications_id'
});

User.hasMany(Like, {
  foreignKey: 'user_id'
});

Like.belongsTo(User, {
  foreignKey: 'user_id'
});
module.exports = Like;
