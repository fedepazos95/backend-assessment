const request = require('supertest');
const sinon = require('sinon');

let app, authMiddleware;

describe('Users router', () => {
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

  it('authenticate - should authenticate a user', async () => {
    const res = await request(app)
      .post('/api/users/authenticate')
      .send({ email: 'barnettblankenship@quotezart.com' })
      .set('Content-Type', 'application/json');
    console.log(res);
    expect(res.statusCode).toEqual(200);
    expect(typeof (res.body)).toBe('object');
    expect(res.body).toHaveProperty('user');
    expect(res.body).toHaveProperty('token');
  });

  it('authenticate - should fail due to missing user', async () => {
    const res = await request(app)
      .post('/api/users/authenticate')
      .send({ email: 'fail@fail.com' })
      .set('Content-Type', 'application/json');
      console.log(res);
      expect(res.statusCode).toEqual(500);
      expect(res.body.message).toEqual('User not found');
  });

  it('getUsers - should get a list of users', async () => {
    const res = await request(app)
      .get('/api/users');
    expect(res.statusCode).toEqual(200);
    expect(typeof (res.body)).toBe('object');
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
  });

  it('getUsers with query params - should get users by name', async () => {
    const res = await request(app)
      .get('/api/users?name=jerry');
    expect(res.statusCode).toEqual(200);
    expect(typeof (res.body)).toBe('object');
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('name');
  });

  it('getUserById - should get a user by id', async () => {
    const res = await request(app)
      .get('/api/users/a0ece5db-cd14-4f21-812f-966633e7be86');
    expect(res.statusCode).toEqual(200);
    expect(typeof (res.body)).toBe('object');
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('email');
  });

  it('getUserPolicies - should get a list of policies from user', async () => {
    const res = await request(app)
      .get('/api/users/a0ece5db-cd14-4f21-812f-966633e7be86/policies');
    expect(res.statusCode).toEqual(200);
    expect(typeof (res.body)).toBe('object');
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toHaveProperty('inceptionDate');
  });

  afterAll(() => {
    app.close();
  })
});