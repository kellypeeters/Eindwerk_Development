const {
    Pool
} = require('pg');
const supertest = require('supertest');
const app = require('../server.js');

const {
    send
} = require('process');

const request = supertest(app);

let pgPool;

beforeAll(() => {
    pgPool = new Pool({
        connectionString: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
    });
});

afterAll(async () => {
    await pgPool.end();
});


/**
 * [Update een formulier]
 * @param: {number} id
 * @returns: row geupdate in database (status: 200 ok)
 */
describe('UPDATE /updateVraag/:id', () => {
    let id; 
    it("updates een vraag", async (done) => {
        try {
            const response = await request
                .patch("/updateVraag/" + id)
                .send({
                    categoriesoort: "Probleem",
                    voornaam: "Test via update",
                    achternaam: "Test via update",
                    email: "test@test.be",
                    bericht: "Test via update",
                    id: "47"
                })
                .expect(response.status).toBe(200)
                .done();
        } catch (error) {}
    });
});