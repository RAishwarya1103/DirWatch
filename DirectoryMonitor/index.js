#!/usr/bin/env node
const cron = require("node-cron");
const serviceController = require("./src/Controller/service");
const { DirectoryMonitor } = require("./src/directoryMonitoring");
const { logger, sequelize } = require("./src/utils");

const getActiveConfigURL = `http://localhost:4000/configuration/activeconfig`;

async function getConfigAndStartTask() {
  logger.debug(`Entered function getConfigAndStartTask`);
  try {
    const response = await serviceController.getData(getActiveConfigURL);
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
  } catch (err) {
    logger.error(`Error in getConfigAndStartTask: ${err}`);
  }
}

getConfigAndStartTask();
