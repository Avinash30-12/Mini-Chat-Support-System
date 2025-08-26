const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./middleware/logger');
const app = express();
const sessionRoutes = require('./routes/sessionRoutes');
const authRoutes = require("./routes/authRoutes");

app.use(helmet());
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
// REQUEST LOGGING MIDDLEWARE
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

// ROOT ROUTE (Optional)
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Chat Support Server API!',
    endpoints: {
      health: 'GET /health',
      startSession: 'POST /api/start-session',
      getMessages: 'GET /api/messages/:sessionId'
    }
  });
});

app.use('/api', sessionRoutes);
app.use('/auth', authRoutes);


app.all(/.*/, (req, res) => {
  logger.warn(`404 - Route Not Found: ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found on this server.`
  });
});

module.exports = app;