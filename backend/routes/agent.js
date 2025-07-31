const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes in this file are protected
router.use(authMiddleware);

// @route   POST /api/agent
// @desc    Send a message to the mock agent
router.post('/', agentController.handleAgentMessage);

module.exports = router;
