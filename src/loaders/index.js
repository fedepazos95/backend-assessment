const expressLoader = require('./express');
const swaggerLoader = require('./swagger');

const loaders = async ({ expressApp }) => {
  await swaggerLoader({ app: expressApp });
  console.log('Swagger loaded');
  await expressLoader({ app: expressApp });
  console.log('Express loaded');
}

module.exports = loaders;