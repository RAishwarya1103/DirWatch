const { createLogger, transports, format } = require("winston");
const fs = require("fs");
const env = process.env.NODE_ENV;
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

var logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      name: "error-file",
      filename: "./logs/exceptions.log",
      level: "error",
      json: false,
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
    }),

    new (require("winston-daily-rotate-file"))({
      filename: `${logDir}/-DirWatcherAPI.log`,
      prepend: true,
      json: false,
      level: env === "development" ? "verbose" : "info",
    }),
  ],
  exitOnError: false,
});
module.exports = logger;
