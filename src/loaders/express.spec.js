const request = require('supertest');

const app = require('../app');

describe('Express loader', () => {
  it('should return that server is running', async () => {
    const res = await request(app)
      .get('/status');
    expect(res.statusCode).toEqual(200);
  });

  it('should fail trying to get a list of users', async () => {
    const res = await request(app)
      .get('/api/users');
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toEqual('No authorization token was found');
  });

  it('should fail', async () => {
    const res = await request(app)
      .get('/api/fail');
    expect(res.statusCode).toEqual(404);
    expect(res.body.message).toEqual('Not Found');
  });

  afterAll(() => {
    app.close();
  })
});