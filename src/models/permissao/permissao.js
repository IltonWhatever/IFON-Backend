const { DataTypes } = require('sequelize');
const { SequelizeDatabaseConnection } = require('../../database/connection');

const sequelize = SequelizeDatabaseConnection.getConnection();

const Permissao = sequelize.define(
  'Permissions',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'permissions'
  }
);

module.exports = Permissao;
