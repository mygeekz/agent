const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes in this file are protected
router.use(authMiddleware);

// @route   GET /api/files
// @desc    Get all files for the logged-in user
router.get('/', fileController.getFiles);

// @route   POST /api/files
// @desc    Upload a file
// The multer middleware is handled inside the controller function for this setup
router.post('/', fileController.uploadFile);

module.exports = router;
