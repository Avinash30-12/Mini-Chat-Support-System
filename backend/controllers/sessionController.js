const Session = require('../models/session');
const { assignAgent } = require('../utils/agentManager');
const logger = require('../middleware/logger');
const { v4: uuidv4 } = require('uuid');

const generateSessionId = () => {
  return 'session_' + uuidv4();
};

// Create a new chat session
const startSession = async (req, res) => {
  try {
    logger.info('Starting new chat session...');

    const { userId } = req.body;
    if (!userId) {
      logger.warn('Start session failed: userId is required');
      return res.status(400).json({
        success: false,
        message: 'userId is required in request body'
      });
    }
    const sessionId = generateSessionId();
    logger.info(`Generated session ID: ${sessionId}`);
    // Assign an agent
    const agentId = assignAgent();
    logger.info(`Assigned agent: ${agentId} to session: ${sessionId}`);

    // Create initial system message
    const welcomeMessage = {
      sender: 'system',
      text: `You are now connected to support agent ${agentId}. How can we help you today?`
    };

    // Create the session in database
    const newSession = new Session({
      sessionId,
      userId,
      agentId,
      isActive: true,
      messages: [welcomeMessage]
    });

    const savedSession = await newSession.save();
    logger.info(`Session created successfully in database: ${sessionId}`);

    return res.status(201).json({
      success: true,
      message: 'Chat session created successfully',
      sessionId: savedSession.sessionId,
      agentId: savedSession.agentId,
      userId: savedSession.userId,
      createdAt: savedSession.createdAt
    });

  } catch (error) {
    logger.error(`Error creating session: ${error.message}`, error);
    return res.status(500).json({
      success: false,
      message: 'Failed to create chat session',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
};

// Get chat history for a session
const getMessages = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await Session.findOne({ sessionId });

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    res.json({ success: true, messages: session.messages || [] });
  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    logger.info(`Fetching chat history for user: ${userId}`);

    // Find closed sessions of the user
    const sessions = await Session.find({ userId, isActive: false })
      .sort({ updatedAt: -1 });

    return res.json({
      success: true,
      history: sessions,
    });

  } catch (error) {
    logger.error(`Error fetching history for user ${req.params.userId}: ${error.message}`, error);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch history',
    });
  }
};

const getAgentSessions = async (req, res) => {
  try {
    const {agentId} = req.params;
    const sessions = await Session.find({ agentId }).sort({ createdAt: -1 });

    return res.json({ success: true, sessions });
  } catch (error) {
    logger.error(`Error fetching sessions for agent ${req.params.agentId}: ${error.message}`);
    return res.status(500).json({ success: false, message: 'Failed to fetch agent sessions' });
  }
};

const listSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ isActive: true })
      .select('sessionId userId agentId createdAt');
    res.json({ success: true, sessions });
  } catch (err) {
    logger.error(`Error listing sessions: ${err.message}`);
    res.status(500).json({ success: false, message: 'Failed to fetch sessions' });
  }
};

// GET /health
const getHealth = (req, res) => {
  return res.status(200).json({
    success: true,
    status: 'OK',
    message: 'Server is running smoothly!',
    timestamp: new Date().toISOString()
  });
};


module.exports = { startSession, getMessages, getHealth , getHistory ,getAgentSessions , listSessions };
