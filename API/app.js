const express = require("express");
const app = express();
const { httpLogger } = require("./src/middlewares");
const { logger, sequelize } = require("./src/utils");
const configRoutes = require("./src/routes/configuration");
const taskRoutes = require("./src/routes/task");
const PORT = 4000;

app.use(express.json());
app.use(httpLogger);
app.use("/configuration", configRoutes);
app.use("/task", taskRoutes);
app.get("/_health", (req, res) => {
  res.status(200).send("ok");
});
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  logger.error(`${error}`);
  res.status(status).json({ message: message, data: data });
});
sequelize
  .sync()
  .then((result) => {
    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`${err}`);
  });
