const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Backend Assessment - Sopra Steria',
      version: '1.0.0',
      description: 'API to manage Clients and their respectives Policies',
    },
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

const swaggerLoader = async ({ app }) => {
  // API Docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
module.exports = swaggerLoader;