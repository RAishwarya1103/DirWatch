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
    period: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    magicString: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    createdAt: Sequelize.DATE(6),
    updatedAt: Sequelize.DATE(6),
  },
  { freezeTableName: true }
);
module.exports = Configuration;
