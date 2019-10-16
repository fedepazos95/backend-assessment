const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  mocky: {
    users: process.env.USERS_URL,
    policies: process.env.POLICIES_URL
  },
  api: {
    prefix: '/api',
  },
  secretKey: 'This is a secret key. Backend Assessment.',
  roles: {
    user: 'user',
    admin: 'admin'
  },
  testToken: process.env.TEST_TOKEN
}