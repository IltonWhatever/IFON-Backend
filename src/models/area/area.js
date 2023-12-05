const { DataTypes } = require('sequelize');
const { SequelizeDatabaseConnection } = require('../../database/connection');

const sequelize = SequelizeDatabaseConnection.getConnection();

const Area = sequelize.define(
  'Areas',
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
    tableName: 'areas',
    timestamps: true
  }
);

module.exports = Area;
