const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred.',
    // In development, you might want to send the stack trace
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
