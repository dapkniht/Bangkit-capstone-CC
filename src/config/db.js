const Sequelize = require("sequelize");

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

module.exports = db;
