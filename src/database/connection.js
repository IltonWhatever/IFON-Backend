const { Sequelize } = require('sequelize');
const { logger } = require('../loaders/logger');
require('dotenv').config();

const DB_DIALECT = process.env.DB_DIALECT || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_NAME = process.env.DB_NAME || 'ifon';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || 'postgres';

class SequelizeDatabaseConnection {
  constructor() {
    this.sequelize = null;
  }

  static getConnection() {
    if (!this.sequelize) {
      this.sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
        host: DB_HOST,
        dialect: DB_DIALECT,
        logging: false
      });
    }

    return this.sequelize;
  }

  static async connect() {
    return new Promise((resolve, reject) => {
      const connection = this.getConnection();

      connection
        .authenticate()
        .then(() => {
          logger.info('Database connection has been established successfully.');
          resolve(this.sequelize);
        })
        .catch((error) => {
          logger.error(`Unable to connect to the database`);
          reject(error);
        });
    });
  }
}

module.exports = { SequelizeDatabaseConnection };
