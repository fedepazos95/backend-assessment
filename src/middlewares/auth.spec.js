const request = require('supertest');
const app = require('../app');
const config = require('../config');

describe('Auth middleware', () => {

  it('should pass the middleware and return list of users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${config.testToken}`);
      expect(res.statusCode).toEqual(200);
      expect(typeof (res.body)).toBe('object');
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('name');
  });

  it('should pass the middleware and fail due to role permissions', async () => {
    const res = await request(app)
      .get('/api/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b/user')
      .set('Authorization', `Bearer ${config.testToken}`);
      expect(res.statusCode).toEqual(403);
      expect(res.body.message).toEqual('User is not authorized to perform this request.');
  });

  afterAll(() => {
    app.close();
  })
});