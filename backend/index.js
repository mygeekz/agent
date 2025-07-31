require('dotenv').config();
const express = require('express');
const path = require('path');

// Route Imports
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const fileRoutes = require('./routes/files');
const agentRoutes = require('./routes/agent');

// Middleware Imports
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Body Parser Middleware
app.use(express.json());

// Simple welcome route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API! See /api-docs for documentation.' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/agent', agentRoutes);

// Serve uploaded files statically
// This makes files in the 'uploads' directory accessible via URL, e.g., http://localhost:3001/uploads/filename.jpg
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Global Error Handler Middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
