const expressLoader = require('./express');

const loaders = async expressApp => {
  await expressLoader(expressApp);
  console.log('Express Initialized');
}

module.exports = {
  init: loaders
}