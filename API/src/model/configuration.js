const { Sequelize, Op } = require("sequelize");
const sequelize = require("../utils/database");

const Configuration = sequelize.define(
  "configuration",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    directory: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    interval: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
<<<<<<< HEAD
    period: {
      type: Sequelize.STRING,
      allowNull: false,
    },
=======
>>>>>>> c1555e073055f5085d292129ae577ef740ec7ae4
    magicString: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { freezeTableName: true, timestamps: false }
);
module.exports = Configuration;
