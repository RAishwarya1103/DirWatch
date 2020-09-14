const moment = require("moment");

const Task = require("../model/task");
const { logger, sequelize } = require("../utils");
const { Op } = require("sequelize");

exports.getTask = async (req, res, next) => {
  logger.debug(`Entered function getTask with params: ${req.params.taskId}`);

  try {
    const taskId = req.params.taskId;
    let task = await Task.findAll({
      where: {
        id: {
          [Op.eq]: taskId,
        },
      },
    });
    let taskDetails = task[0].dataValues;
    taskDetails = await updateTaskDetails(taskDetails, taskId);
    logger.debug(`Exited getTask getTask.`);
    return res.status(200).json({ task: task });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    logger.error(`Error in getTask: ${err}`);

    next(err);
  }
};
exports.getAllTask = async (req, res, next) => {
  logger.debug(`Entered function getAllTask`);
  try {
    let tasks = await Task.findAll();
    let taskDetail = await tasks.map(async (item) => {
      item.dataValues = await updateTaskDetails(
        item.dataValues,
        item.dataValues.id
      );
      return item;
    });
    logger.debug(`Exited function getAllTask.`);
    return res.status(200).json({ tasks: taskDetail });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    logger.error(`Error in getAllTask: ${err}`);

    next(err);
  }
};

async function updateTaskDetails(taskDetail, taskId) {
  logger.debug(
    `Entered function updateTaskDetails with params: ${taskDetail},${taskId}`
  );
  try {
    let taskDetails = taskDetail;
    let prevId = await Task.max("id", {
      where: {
        id: {
          [Op.lt]: taskId,
        },
      },
    });
    prevId = Number.isNaN(prevId) ? 0 : prevId;
    const prevFileData = await Task.findAll({
      attributes: ["fileList"],
      where: {
        id: {
          [Op.eq]: prevId,
        },
      },
    });
    let prevFileList = new Array();
    prevFileList =
      prevFileData.length > 0
        ? prevFileData[0].dataValues.fileList.split(" ")
        : prevFileList;
    let currentFileList = taskDetails.fileList.split(" ");
    let filesAdded = currentFileList.filter((file) => {
      return !prevFileList.includes(file);
    });
    let filesDeleted = prevFileList.filter((file) => {
      return !currentFileList.includes(file);
    });
    taskDetails.filesAdded = filesAdded;
    taskDetails.filesDeleted = filesDeleted;

    taskDetails.fileList = currentFileList;
    taskDetails.totalTime = moment(taskDetails.endTime).diff(
      moment(taskDetails.startTime),
      "millisecond"
    );
    taskDetails.totalTime = taskDetails.totalTime + "ms";
    logger.debug(`Exited updateTaskDetails.`);

    return taskDetails;
  } catch (err) {
    logger.error(`Error in updateTaskDetails: ${err}`);

    throw err;
  }
}
