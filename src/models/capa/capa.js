const { DataTypes } = require('sequelize');
const { SequelizeDatabaseConnection } = require('../../database/connection');
const Publication = require('../publicacao/publicacao');

const sequelize = SequelizeDatabaseConnection.getConnection();

const Capa = sequelize.define(
  'Capa',
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

    size: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    key: {
      type: DataTypes.STRING,
      allowNull: false
    },

    url: {
      type: DataTypes.STRING,
      allowNull: false
    },

    publications_id: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    tableName: 'capas',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  }
);

Publication.hasOne(Capa, {
  foreignKey: 'publications_id'
});
Capa.beforeValidate(async (file, options) => {
  // console.log('inside hooks');
  if (!file.url) {
    file.url = `${process.env.APP_URL}/files/${file.key}`;
  }
});
module.exports = Capa;
