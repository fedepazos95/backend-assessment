const expressLoader = async app => {

  // Health Check endpoint
  app.get('/status', (req, res) => res.status(200).send({ message: 'Server running' }));
  // Error handlers
  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: err.message,
    });
  });
}
module.exports = expressLoader;