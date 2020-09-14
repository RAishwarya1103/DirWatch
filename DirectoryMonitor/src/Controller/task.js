const Task = require("../model/task");
const { logger } = require("../utils");
const { Op } = require("sequelize");

async function createTask(startTime, configId, status) {
  logger.debug(
    `Entered function createTask with params: ${startTime},${configId},${status}`
  );
  try {
    const result = await Task.create({
      startTime: startTime,
      status: status,
      configId: configId,
    });
    logger.debug(`Exited function createTask.`);

    return result;
  } catch (err) {
    logger.error(`Error in createTask: ${err}`);
    throw new Error(err);
  }
}
async function updateTask(stringCount, id, status, fileList) {
  const endTime = new Date().toISOString();
  logger.debug(
    `Entered function updateTask with params: ${stringCount},${id},${status},${endTime},${fileList}`
  );
  try {
    await Task.update(
      {
        status: status,
        endTime: new Date().toISOString(),
        magicStringCount: stringCount,
        fileList: fileList,
      },
      {
        where: {
          id: { [Op.eq]: id },
        },
      }
    );
    logger.debug(`Exited function updateTask.`);
  } catch (err) {
    logger.error(`Error in updateTask: ${err}`);
    throw new Error(err);
  }
}
async function getTaskId(status) {
  logger.debug(`Entered function getTaskId with params: ${status}`);
  try {
    const taskDetail = await Task.findAll({
      attributes: ["id"],
      where: {
        status: {
          [Op.eq]: status,
        },
      },
    });
    logger.debug(`Exited function getTaskId.`);
    return +taskDetail[0].dataValues.id;
  } catch (err) {
    logger.error(`Error in getTaskId: ${err}`);
    throw new Error(err);
  }
}

module.exports = { createTask, updateTask, getTaskId };
