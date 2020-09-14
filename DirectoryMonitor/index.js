<<<<<<< HEAD
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
=======
//const express = require("express");
const cron = require("node-cron");
const serviceController = require("./src/Controller/service");
const { DirectoryMonitor } = require("./src/directoryMonitoring");
//const { httpLogger } = require("./src/middlewares");
const { logger, sequelize } = require("./src/utils");
//const PORT = 4100;

const getActiveConfigURL = `http://localhost:4000/configuration/activeconfig`;

// const app = express();
// app.use(httpLogger);

// app.use((error) => {
//   logger.error(`${error}`);
// });
// app.listen(PORT, () => {
//   logger.info(`Server listening on port ${PORT}`);
// });
(async () => {
  sequelize
    .sync()
    .then(() => {
      return;
    })
    .catch((err) => {
      logger.error(`${err}`);
    });

  const response = await serviceController.getData(getActiveConfigURL);
  const magicString = response.config[0].magicString;
  const directory = response.config[0].directory;
  const configId = response.config[0].id;
  const interval = response.config[0].interval.toString();
  const schedule = response.config[0].schedule;
  let intervalSchedule = `* * * * * `;
  console.log(response);
  //TODO interval calculation
  switch (interval) {
    case interval < 59:
      intervalSchedule = `*/${interval} * * * * `;
      break;
    // case interval < 3599:
    //   let minutes = Math.floor(interval / 60);
    //   intervalSchedule = `* */${minutes} * * * `;
    //   break;
    // case interval < 86400:
    //   let hrs = Math.floor(interval / 3600);
    //   intervalSchedule = `* */${minutes} * * * * `;
    //   break;
  }
  //intervalSchedule = `* * * * * `;

  cron.schedule(intervalSchedule, function () {
    const startTime = new Date().toISOString();
    console.log("start time stamp" + new Date().toISOString());

    DirectoryMonitor(magicString, directory, configId, startTime);
  });
})();
>>>>>>> c1555e073055f5085d292129ae577ef740ec7ae4
