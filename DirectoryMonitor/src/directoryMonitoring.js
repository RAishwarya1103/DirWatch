const fileController = require("./Controller/file");
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
    //    await fileController.CreateFileList(result.fileList, record.id);
    await taskController.updateTask(
      result.magicStringCount,
      record.id,
      constants.COMPLETED,
      result.fileList.join(" ")
    );
  } catch (err) {
    // await taskController.updateTask("", record.id, constants.FAILED);
    logger.error(`Error in DirectoryMonitor: ${err}`);
    //    throw new Error(err);
  }
  logger.debug(`Exited function DirectoryMonitor.`);
}

module.exports = { DirectoryMonitor };
