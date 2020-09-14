const fileController = require("./Controller/file");
const task = require("./Controller/task");
const taskController = require("./Controller/task");
const { logger, constants } = require("./utils");

async function DirectoryMonitor(magicString, directory, configId, startTime) {
  logger.debug(
    `Entered function DirectoryMonitor with params: ${magicString},${directory},${configId},${startTime}`
  );
  try {
    const regExp = new RegExp(magicString, "gi");
    const record = await taskController.createTask(
      startTime,
      configId,
      constants.INPROGRESS
    );
    const result = await fileController.SearchFileinDir(directory, regExp);
    await taskController.updateTask(
      result.magicStringCount,
      record.id,
      constants.COMPLETED,
      result.fileList.join(" ")
    );
  } catch (err) {
    const recordId = await taskController.getTaskId(constants.INPROGRESS);
    await taskController.updateTask(0, recordId, constants.FAILED, "");
    logger.error(`Error in DirectoryMonitor: ${err}`);
  }
  logger.debug(`Exited function DirectoryMonitor.`);
}

module.exports = { DirectoryMonitor };
