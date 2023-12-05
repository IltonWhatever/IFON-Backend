const { DataTypes } = require('sequelize');
const { SequelizeDatabaseConnection } = require('../../database/connection');

const Publication = require('../publicacao/publicacao');
const Area = require('../area/area');

const sequelize = SequelizeDatabaseConnection.getConnection();

const PublicationArea = sequelize.define(
  'PublicationArea',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    }
  },
  {
    tableName: 'publications_areas',
    timestamps: false
  }
);

PublicationArea.belongsTo(Publication, {
  foreignKey: 'publications_id'
});

PublicationArea.belongsTo(Area, {
  foreignKey: 'area_id'
});

module.exports = PublicationArea;
