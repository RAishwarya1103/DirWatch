const fetch = require("node-fetch");
const { logger } = require("../utils");

async function getData(url = "") {
  logger.debug(`Entered function getData with params: ${url}`);
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    logger.debug(`Exited function getData.`);
    return response.json();
  } catch (err) {
    logger.error(`Error in getData: ${err}`);
    throw new Error(err);
  }
}
module.exports = { getData };
