module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    // responseCode: err.statusCode,
    status: err.status,
    message: err.message
  });
}
