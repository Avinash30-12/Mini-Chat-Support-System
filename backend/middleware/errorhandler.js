const logger = require('./logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack); // Log the error stack trace

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) // Show stack only in dev
  });
};

module.exports = errorHandler;