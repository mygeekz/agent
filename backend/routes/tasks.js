const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes in this file are protected and require a valid JWT
router.use(authMiddleware);

// @route   GET /api/tasks
// @desc    Get all tasks for the logged-in user
router.get('/', taskController.getTasks);

// @route   POST /api/tasks
// @desc    Create a new task
router.post('/', taskController.createTask);

// @route   PUT /api/tasks/:id
// @desc    Update a task's status
router.put('/:id', taskController.updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', taskController.deleteTask);

module.exports = router;
