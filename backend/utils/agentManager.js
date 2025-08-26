const logger = require('../middleware/logger');

// Mock data - in a real app, this would come from a database
const availableAgents = [
  { id: 'agent_1', name: 'Alice', activeSessions: 0 },
  { id: 'agent_2', name: 'Bob', activeSessions: 0 },
  { id: 'agent_3', name: 'Charlie', activeSessions: 0 }
];

const assignAgent = () => {
  try {
    // Find agent with the least active sessions (simple load balancing)
    const agent = availableAgents.reduce((prev, current) => 
      (prev.activeSessions < current.activeSessions) ? prev : current
    );
    
    // Increment their session count
    agent.activeSessions += 1;
    
    logger.info(`Assigned agent: ${agent.id} (Now has ${agent.activeSessions} sessions)`);
    return agent.id;
    
  } catch (error) {
    logger.error('Error assigning agent:', error);
    const randomAgent = availableAgents[Math.floor(Math.random() * availableAgents.length)];
    return randomAgent.id;
  }
};

const releaseAgent = (agentId) => {
  const agent = availableAgents.find(a => a.id === agentId);
  if (agent && agent.activeSessions > 0) {
    agent.activeSessions -= 1;
    logger.info(`Released agent: ${agentId} (Now has ${agent.activeSessions} sessions)`);
  }
};

module.exports = { assignAgent, releaseAgent };