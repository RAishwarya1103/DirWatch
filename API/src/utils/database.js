const Sequelize = require("sequelize");
const sequelize = new Sequelize("DirWatcher", "root", "MySQLRootServer@123", {
  dialect: "mysql",
  host: "localhost",
});
module.exports = sequelize;
