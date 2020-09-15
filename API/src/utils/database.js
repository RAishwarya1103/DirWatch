const { databaseName, password, user, dialect, host } = require("../../config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(databaseName, user, password, {
  dialect: dialect,
  host: host,
});
module.exports = sequelize;
