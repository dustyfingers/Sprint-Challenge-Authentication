const request = require('supertest');

const router = require('./auth-router.js');

describe('auth-router.js', () => {
    describe('POST /register', () => {
        it('returns 201 OK', async () => {
            // make  GET request to the / endpoint on the server
            const res = await request(router).post('/register');

            // assert we get an http status code 200
            return expect(res.status).toBe(201);
        });
        it("should return an array containing a number", async () => {
            // ping api endpoint
            const res = await request(router).post('/login');

            // assert res equals correct api response
            return expect(res.body).toEqual({token: ''});
        });
    });
});