const { Router } = require('express');
const route = Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const config = require('../config');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Assessment - Sopra Steria',
      version: '1.0.0',
      description: 'API to manage Clients and their respectives Policies',
      contact: {
        email: 'fede.pazos95@gmail.com'
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api`,
        description: 'Development server'
      }
    ],
    tags: [
      {
        name: 'users',
        description: 'Users management'
      },
      {
        name: 'policies',
        description: 'Policies management'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      responses: {
        Unauthenticated: {
          description: 'Not authenticated',
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Error'
              },
              example: {
                message: 'No authorization token was found'
              }
            }
          }
        },
        Unauthorized: {
          description: 'Not authorized',
          content: {
            'application/json': {
              schema: {
                $ref: '#/definitions/Error'
              },
              example: {
                message: 'User is not authorized to perform this request'
              }
            }
          }
        }
      }
    },
    definitions: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          name: {
            type: 'string'
          },
          email: {
            type: 'string'
          },
          role: {
            type: 'string',
            enum: ['user', 'admin']
          }
        }
      },
      Policy: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          amountInsured: {
            type: 'number'
          },
          email: {
            type: 'string'
          },
          inceptionDate: {
            type: 'string'
          },
          installmentPayment: {
            type: 'boolean'
          },
          clientId: {
            type: 'string'
          }
        }
      },
      Authentication: {
        type: 'object',
        properties: {
          user: {
            $ref: "#/definitions/User"
          },
          token: {
            type: 'string'
          }
        }
      },
      Error: {
        type: 'object',
        properties: {
          message: {
            type: 'string'
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  app.use('/docs', route);
  route.use('/', swaggerUi.serve, swaggerUi.setup(specs));
}