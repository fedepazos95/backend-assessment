const request = require('supertest');
const sinon = require('sinon');

let app, authMiddleware;

describe('Policies router', () => {
  beforeEach(() => {
    // mocks auth middleware
    authMiddleware = require('../middlewares/auth');
    sinon.stub(authMiddleware, 'isAuthenticated').callsFake(() => {
      return (req, res, next) => { return next(); }
    })
    app = require('../app');
  });

  afterEach(() => {
    // restore original method
    authMiddleware.isAuthenticated.restore();
  });

  it('getPolicies - should get a list of policies', async () => {
    const res = await request(app)
      .get('/api/policies');
      expect(res.statusCode).toEqual(200);
      expect(typeof (res.body)).toBe('object');
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('clientId');
  });

  it('getUserLinked - should get a user by policy id', async () => {
    const res = await request(app)
      .get('/api/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b/user');
    expect(res.statusCode).toEqual(200);
    expect(typeof (res.body)).toBe('object');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
  });

  afterAll(() => {
    app.close();
  })
});