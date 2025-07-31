const db = require('../config/db');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
exports.getTasks = async (req, res, next) => {
  try {
    const [tasks] = await db.query('SELECT id, title, description, status, created_at FROM tasks WHERE user_id = ?', [req.user.userId]);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new task
// @route   POST /api/tasks
exports.createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required.' });
    }

    const [result] = await db.query(
      'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
      [req.user.userId, title, description]
    );

    res.status(201).json({ message: 'Task created successfully!', taskId: result.insertId });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a task's status
// @route   PUT /api/tasks/:id
exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['pending', 'done'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status provided. Must be "pending" or "done".' });
    }

    const [result] = await db.query(
      'UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?',
      [status, id, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found or user not authorized.' });
    }

    res.json({ message: 'Task status updated successfully.' });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [result] = await db.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, req.user.userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found or user not authorized.' });
    }

    res.json({ message: 'Task deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
