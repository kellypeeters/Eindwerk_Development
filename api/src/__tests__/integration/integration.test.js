const supertest = require('supertest');
const Helpers = require('../../utils/helpers.js')
const app = require('.././../server.js')
const request = supertest(app);

describe('GET / endpoint', () => {
    test('check if / responds to 200', async (done) => {
        try {
            await request.get('/')
                .expect(200)
                .then((res) => {
                    done()
                });
        } catch (e) {
            if (e) console.log(e);
        }
    });
});
