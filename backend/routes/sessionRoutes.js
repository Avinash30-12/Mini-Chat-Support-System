const express = require('express');
const router = express.Router();
const { startSession, getMessages, getHealth , listSessions , getHistory ,getAgentSessions} = require('../controllers/sessionController');

router.post('/startsession', startSession);
router.get('/messages/:sessionId', getMessages);
router.get('/sessions', listSessions);

router.get('/history/:userId', getHistory);
router.get('/agent-sessions/:agentId', getAgentSessions);

router.get('/health', getHealth);

module.exports = router;