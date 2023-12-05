const { DataTypes } = require('sequelize');
const { SequelizeDatabaseConnection } = require('../../database/connection');

const sequelize = SequelizeDatabaseConnection.getConnection();

const Campi = sequelize.define(
  'Campi',
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
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'campi'
  }
);

module.exports = Campi;
