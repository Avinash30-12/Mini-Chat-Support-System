const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize } = format;

// Console log format (with colors)
const consoleFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}]: ${message}`;
});

// File log format (plain text, uppercased levels)(logs/app.log)
const fileFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create the main logger
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [
    new transports.Console({
      format: combine(
        colorize({ all: true }),                     // enable colors
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // add timestamp
        consoleFormat
      )
    }),
    // File transport → only errors, no colors
    new transports.File({
      filename: 'logs/app.log',
      level: 'error',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        fileFormat
      )
    })
  ]
});

module.exports = logger;
