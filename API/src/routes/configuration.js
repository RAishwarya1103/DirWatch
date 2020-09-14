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
  ],
  configController.createConfig
);
router.put(
  "/config/:configId",
  [body("isActive").not().isEmpty().isBoolean()],
  configController.updateConfigStatus
);

module.exports = router;

/*

[
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please enter valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("email address already exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],


*/
