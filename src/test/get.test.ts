import { describe, expect } from '@jest/globals';
import app from '../index';
import supertest = require('supertest');
describe('GET /api', () => {
  it('should return status 200 get all products', async () => {
    const response = await supertest(app).get('/api');
    expect(response.status).toBe(200);
  });
});
