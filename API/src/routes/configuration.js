const express = require("express");
const { body } = require("express-validator");

const configController = require("../controller/configuration");

const router = express.Router();

router.get("/config", configController.getAllConfig);
router.get("/activeconfig", configController.getActiveConfig);
router.post(
  "/config",
  [
    body("magicString").trim().not().isEmpty(),
    body("directory").trim().not().isEmpty(),
    body("isActive").not().isEmpty().isBoolean(),
    body("interval").not().isEmpty().isNumeric(),
    body("period").trim().not().isEmpty(),
  ],
  configController.createConfig
);
router.put(
  "/config/:configId",
  [body("isActive").not().isEmpty().isBoolean()],
  configController.updateConfigStatus
);

module.exports = router;
