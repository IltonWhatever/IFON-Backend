const { DataTypes } = require('sequelize');
const { SequelizeDatabaseConnection } = require('../../database/connection');
const User = require('../user/user');
const Type = require('../type/type');

const sequelize = SequelizeDatabaseConnection.getConnection();

const Publication = sequelize.define(
  'Publication',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
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

    is_internal_ifce: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

    shares_quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },

    cover: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'publications',
    timestamps: true,
  }
);

Publication.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
});

Publication.belongsTo(Type, {
  foreignKey: 'type_id',
  as: 'type',
});

module.exports = Publication;
