const multer = require('multer');
const path = require('path');
const db = require('../config/db');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: './backend/uploads/',
  filename: function (req, file, cb) {
    // Prepend timestamp to original name to make it unique
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Initialize multer upload object
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}).single('file'); // 'file' is the name of the form field

// @desc    Upload a file
// @route   POST /api/files
exports.uploadFile = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: `Multer error: ${err.message}` });
      }
      return res.status(500).json({ message: `An unknown error occurred during upload: ${err.message}` });
    }

    if (req.file == undefined) {
      return res.status(400).json({ message: 'No file selected!' });
    }

    try {
      const { filename, path: filePath } = req.file;
      const userId = req.user.userId;

      await db.query(
        'INSERT INTO files (user_id, filename, path) VALUES (?, ?, ?)',
        [userId, filename, filePath]
      );

      res.status(201).json({
        message: 'File uploaded successfully!',
        file: {
          filename: filename,
          path: filePath,
          size: req.file.size,
        },
      });
    } catch (dbError) {
      next(dbError);
    }
  });
};

// @desc    Get all files for a user
// @route   GET /api/files
exports.getFiles = async (req, res, next) => {
  try {
    const [files] = await db.query('SELECT id, filename, path, created_at FROM files WHERE user_id = ?', [req.user.userId]);
    res.json(files);
  } catch (error) {
    next(error);
  }
};
