const Session = require('../models/session');
const logger = require('../middleware/logger');

const handleConnection = (io) => {
  io.on('connection', (socket) => {
    logger.info(`Socket connected: ${socket.id}`);

    // --- Join a session ---
    socket.on('join_session', async ({ sessionId, userType }) => {
      try {
        socket.join(sessionId);
        logger.info(`Socket ${socket.id} joined session ${sessionId} as ${userType}`);

        //  send existing messages to newly joined client
        const session = await Session.findOne({ sessionId });
        if (session) {
          socket.emit('session_joined', { sessionId, messages: session.messages || [] });
        } else {
          socket.emit('session_joined', { sessionId, messages: [] });
        }

      } catch (err) {
        logger.error('Error joining session:', err);
      }
    });

    // --- Send a message ---
    socket.on('send_message', async ({ sessionId, sender, text }) => {
      try {
        const msg = { sender, text, createdAt: new Date() };

        // Save to DB
        const session = await Session.findOne({ sessionId });
        if (session) {
          session.messages.push(msg);
          await session.save();
        }

        // Broadcast to all in room
        io.to(sessionId).emit('message', msg);
        logger.info(`Message in ${sessionId} from ${sender}: ${text}`);
      } catch (err) {
        logger.error('Error sending message:', err);
      }
    });

    // --- End session ---
    socket.on('end_session', async ({ sessionId }) => {
      try {
        logger.info(`Ending session ${sessionId}`);

        await Session.findOneAndUpdate(
          { sessionId },
          { $set: { isActive: false } }
        );

        // Notify all clients in the session
        io.to(sessionId).emit('session_ended');

        // Remove all sockets from this session room
        io.in(sessionId).socketsLeave(sessionId);

      } catch (err) {
        logger.error('Error ending session:', err);
      }
    });

    // --- Disconnect ---
    socket.on('disconnect', () => {
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = { handleConnection };
