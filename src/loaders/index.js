const expressLoader = require('./express');

const loaders = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  console.log('Express loaded');
}

module.exports = loaders;