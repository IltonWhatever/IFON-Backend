const { DataTypes } = require('sequelize');
const { SequelizeDatabaseConnection } = require('../../database/connection');
const Permissao = require('../permissao/permissao');
const Campi = require('../campi/campi');

const sequelize = SequelizeDatabaseConnection.getConnection();

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    is_ifce: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },

    telephone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    campus_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },

    permissions_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    timestamps: true,
  }
);

User.belongsTo(Permissao, {
  foreignKey: 'permissions_id',
});

User.belongsTo(Campi, {
  foreignKey: 'campus_id',
  as: 'campi',
});

Campi.hasMany(User, {
  foreignKey: 'campus_id',
});

module.exports = User;
