const express = require("express");
const taskController = require("../controller/task");

const router = express.Router();

router.get("/task", taskController.getAllTask);
router.get("/task/:taskId", taskController.getTask);

module.exports = router;
