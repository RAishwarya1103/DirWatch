const databaseName = "DirWatcher";
const user = "root";
const password = "MySQLRootServer@123";
const dialect = "mysql";
const host = "localhost";

const getConfigURL = `http://localhost:4000/configuration/activeconfig`;

module.exports = {
  databaseName,
  user,
  password,
  dialect,
  host,
  getConfigURL,
};
