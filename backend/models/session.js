const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true,
    enum: ['user', 'agent', 'system']
  },
  text: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true 
  },
  userId: {
    type: String,
    required: true
  },
  agentId: {
    type: String,
    default: null 
  },
  isActive: {
    type: Boolean,
    default: true
  },
  messages: [messageSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Session', sessionSchema);