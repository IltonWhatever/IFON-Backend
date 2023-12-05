const { DataTypes } = require('sequelize');
const { SequelizeDatabaseConnection } = require('../../database/connection');

const sequelize = SequelizeDatabaseConnection.getConnection();
const User = require('../user/user');

const RefreshToken = sequelize.define(
  'RefreshToken',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    token: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    expiration_date: {
      type: DataTypes.DATE,
      allowNull: false
    },

    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    timestamps: true,
    tableName: 'token_whitelist',
    createdAt: true,
    updatedAt: false
  }
);

RefreshToken.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = RefreshToken;
