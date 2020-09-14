const Sequelize = require("sequelize");
const { sequelize } = require("../utils");

const TaskDetail = sequelize.define(
  "taskDetail",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    startTime: {
      type: Sequelize.DATE(6),
      allowNull: false,
    },
    endTime: {
      type: Sequelize.DATE(6),
    },
    totalTime: Sequelize.VIRTUAL,
    status: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    configId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    magicStringCount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    fileList: {
      type: Sequelize.TEXT,
    },
    filesAdded: Sequelize.VIRTUAL,
    filesDeleted: Sequelize.VIRTUAL,

    createdAt: Sequelize.DATE(6),
    updatedAt: Sequelize.DATE(6),
  },
  { freezeTableName: true }
);

module.exports = TaskDetail;
