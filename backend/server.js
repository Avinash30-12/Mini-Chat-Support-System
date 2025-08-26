require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');
const logger = require('./middleware/logger');
const { Server } = require('socket.io');
const { handleConnection } = require('./utils/socketHandler');

const PORT = process.env.PORT || 3002;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*', methods: ['GET', 'POST'] },
});

handleConnection(io);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    logger.info('✅ Connected to MongoDB');
    server.listen(PORT, () => logger.info(` Server running on port ${PORT}`));
  })
  .catch((err) => {
    logger.error('MongoDB connection failed');
    logger.error(err.message);
    process.exit(1);
  });

// shutdown
process.on('SIGINT', async () => {
  logger.info('Shutting down...');
  await server.close();
  await mongoose.connection.close();
  process.exit(0);
});
