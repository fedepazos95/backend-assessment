const request = require('supertest');
const app = require('../app');

describe('Auth middleware', () => {

  it('should pass the middleware and return list of users', async () => {
    const res = await request(app)
      .get('/api/users')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhM2I4ZDQyNS0yYjYwLTRhZDctYmVjYy1iZWRmMmVmODYwYmQiLCJuYW1lIjoiQmFybmV0dCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTcxMDcxMTk4fQ.-9xoavt1YoIhXXN1FT7qUnfBp3ZR2Stq15KAvfxqvG8');
      expect(res.statusCode).toEqual(200);
      expect(typeof (res.body)).toBe('object');
      expect(res.body.length).toBeGreaterThan(0);
      expect(res.body[0]).toHaveProperty('name');
  });

  it('should pass the middleware and fail due to role permissions', async () => {
    const res = await request(app)
      .get('/api/policies/7b624ed3-00d5-4c1b-9ab8-c265067ef58b/user')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJhM2I4ZDQyNS0yYjYwLTRhZDctYmVjYy1iZWRmMmVmODYwYmQiLCJuYW1lIjoiQmFybmV0dCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNTcxMDcxMTk4fQ.-9xoavt1YoIhXXN1FT7qUnfBp3ZR2Stq15KAvfxqvG8');
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual('User is not authorized to perform this request.');
  });

  afterAll(() => {
    app.close();
  })
});