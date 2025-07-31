const db = require('../config/db');

// @desc    Send a message to the mock agent and log the interaction
// @route   POST /api/agent
exports.handleAgentMessage = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const userRequest = req.body;

    if (!userRequest || Object.keys(userRequest).length === 0) {
      return res.status(400).json({ message: 'Request body cannot be empty.' });
    }

    // This is a mock response. In a real application, this would
    // be a call to an external AI service.
    const mockResponse = {
      reply: `This is a mock AI response to your message: "${userRequest.message || JSON.stringify(userRequest)}"`,
      timestamp: new Date().toISOString(),
    };

    // Log the request and response to the database
    await db.query(
      'INSERT INTO logs (user_id, request, response) VALUES (?, ?, ?)',
      [userId, JSON.stringify(userRequest), JSON.stringify(mockResponse)]
    );

    res.json(mockResponse);
  } catch (error) {
    next(error);
  }
};
