class AppError extends Error {
  contractor(message, statusCode) {
    // super(message); // WHY ERROR ON THIS SUPER
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.contractor);
  }
}

module.exports = AppError;
