const Sequelize = require('sequelize');

const database = process.env.DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const dialect = process.env.DB_DIALECT;


const db = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect
});

module.exports = db;