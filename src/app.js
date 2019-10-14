const express = require("express");
const config = require("./config");
const loaders = require("./loaders");

const app = express();

(async function (app) {
  await loaders({ expressApp: app });
  return app;
})(app);

module.exports = app.listen(config.port);

