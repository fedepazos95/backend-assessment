const config = require('../config');
const routes = require('../routes');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');

const expressLoader = async ({ app }) => {

  // Health Check endpoint
  app.get('/status', (req, res) => res.status(200).send({ message: 'Server running' }));
  // Middleware to transform req.body into json
  app.use(bodyParser.json());
  // Load API routes
  app.use(config.api.prefix, routes());
  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });
  // Celebrate errors handler
  app.use(errors());
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