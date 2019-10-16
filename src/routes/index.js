const { Router } = require('express');
const swagger = require('./swagger');
const user = require('./user');
const policy = require('./policy');

module.exports = () => {
  const app = Router();
  swagger(app);
  user(app);
  policy(app);
  return app;
}