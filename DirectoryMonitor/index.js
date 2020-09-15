#!/usr/bin/env node
const cron = require("node-cron");
const serviceController = require("./src/Controller/service");
const { DirectoryMonitor } = require("./src/directoryMonitoring");
const { logger } = require("./src/utils");
const { getConfigURL } = require("./config");

const getActiveConfigURL = getConfigURL;

async function getConfigAndStartTask() {
  logger.debug(`Entered function getConfigAndStartTask`);
  try {
    const response = await serviceController.getData(getActiveConfigURL);
    if (response.config.length > 0) {
      const magicString = response.config[0].magicString;
      const directory = response.config[0].directory;
      const configId = response.config[0].id;
      const interval = +response.config[0].interval;
      const period = response.config[0].period;
      let intervalSchedule = "";

      switch (period) {
        case "seconds":
          intervalSchedule = `*/${interval} * * * * *`;
          break;
        case "minutes":
          intervalSchedule = `*/${interval} * * * *`;
          break;
        case "hours":
          intervalSchedule = `* */${interval} * * *`;
          break;
        case "date":
          intervalSchedule = `* * ${interval} * *`;
          break;
        case "month":
          intervalSchedule = `* * * ${interval} *`;
          break;
        case "week":
          intervalSchedule = `* * * * ${interval}`;
          break;
      }
      logger.info(`Scheduler details: ${period}: ${intervalSchedule}`);
      if (cron.validate(intervalSchedule)) {
        let task = cron.schedule(
          intervalSchedule,
          () => {
            const startTime = new Date().toISOString();
            DirectoryMonitor(magicString, directory, configId, startTime);
          },
          {
            scheduled: false,
          }
        );

        task.start();
      } else {
        logger.error(`Invalid interval cron scheduler`);
        return;
      }
    } else {
      logger.error(`No active configutaion details available.`);
      return;
    }
  } catch (err) {
    logger.error(`Error in getConfigAndStartTask: ${err}`);
  }
}

getConfigAndStartTask();
