const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    // responseCode: err.statusCode,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  // OPERATIONAL, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      // responseCode: err.statusCode,
      status: err.status,
      message: err.message
    });

    // PROGRAMMING or OTHER unknown error: don't leak error details
  } else {
    // 1. Log Error
    console.log('ERROR', err);

    // 2. Send generic message
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!'
    });
  }
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    sendErrorProd(err, res);
  }
};
