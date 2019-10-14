const { Router } = require('express');
const user = require('./user');
const policy = require('./policy');

module.exports = () => {
  const app = Router();
  user(app);
  policy(app);
  return app;
}