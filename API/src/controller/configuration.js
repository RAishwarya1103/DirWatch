const Configuration = require("../model/configuration");
const { logger } = require("../utils");
const { Op } = require("sequelize");
const { validationResult } = require("express-validator");

exports.getAllConfig = async (req, res, next) => {
  logger.debug(`Entered function getAllConfig`);

  try {
    const configs = await Configuration.findAll();
    logger.debug(`Exited function getAllConfig.`);

    return res.status(200).json({ configurations: configs });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    logger.error(`Error in getAllConfig: ${err}`);
    next(err);
  }
};

exports.getActiveConfig = async (req, res, next) => {
  logger.debug(`Entered function getActiveConfig`);
  try {
    const config = await Configuration.findAll({
      where: {
        isActive: {
          [Op.eq]: true,
        },
      },
    });
    logger.debug(`Exited function getActiveConfig.`);

    return res.status(200).json({ config: config });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    logger.error(`Error in getActiveConfig: ${err}`);
    next(err);
  }
};

exports.createConfig = async (req, res, next) => {
  logger.debug(
    `Entered function createConfig with params: ${req.body.directory},${req.body.magicString},${req.body.interval},${req.body.isActive},${req.body.period}`
  );

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.statusCode = 422;
      errors.data = errors.array();
      throw error;
    }
    const directory = req.body.directory;
    const magicString = req.body.magicString;
    const interval = req.body.interval;
    const isActive = req.body.isActive;
    const period = req.body.period;
    const result = await updateAllConfigStatus(false);
    if (result) {
      await Configuration.create({
        directory: directory,
        magicString: magicString,
        interval: interval,
        isActive: isActive,
        period: period,
      });
      return res.status(200).json({ message: "Added new config" });
    } else {
      throw new Error("error occured while updating database");
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    logger.error(`Error in createConfig: ${err}`);

    next(err);
  }
};
exports.updateConfigStatus = async (req, res, next) => {
  logger.debug(
    `Entered function updateConfigStatus with params: ${req.body.isActive},${req.params.configId}`
  );
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed, entered data is incorrect");
      error.statusCode = 422;
      errors.data = errors.array();
      throw error;
    }
    const isActive = req.body.isActive;
    const configId = req.params.configId;
    await Configuration.update(
      { isActive: isActive },
      {
        where: {
          id: {
            [Op.eq]: configId,
          },
        },
      }
    );
    res.status(200).json({ message: "Updated status" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    logger.error(`Error in updateConfigStatus: ${err}`);

    next(err);
  }
};

function updateAllConfigStatus(isActive) {
  logger.debug(
    `Entered function updateAllConfigStatus with params: ${isActive}`
  );
  return new Promise(function (resolve) {
    Configuration.update({ isActive: isActive }, { where: {} })
      .then(() => resolve(true))
      .catch((err) => {
        logger.error(`Error in updateAllConfigStatus: ${err}`);
        throw err;
      });
  });
}
