const { Sequelize } = require('sequelize');
const dbConfig = require('./config/db.config');
const initModels = require('./models/init-models');


const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  logging: false
});

const models = initModels(sequelize);
module.exports = { sequelize, models };