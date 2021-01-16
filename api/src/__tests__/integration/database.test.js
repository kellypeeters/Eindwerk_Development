const {
    Pool
} = require('pg');
const supertest = require('supertest');
const app = require('../../server.js');

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
 * [Get alle ingediende formulieren]
 * @param: /
 * @returns: Alle vragen (json, status 200 ok)
 */
describe('GET / endpoint', () => {
    let categoriesoort;
    test('check if it responds with 200, if it got the object', async (done) => {
        try {
            await request.get('/alleVragen')
                .expect(200)
                .then((res) => {
                    done()
                    console.log('get all records');
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
            done()
        }
    })

    /**
     * [Get alle ingediende formulieren van bepaalde categoriesoort]
     * @param: {string} categoriesoort
     * @returns: Alle vragen met bepaalde categoriesoort (json, status 200 ok)
     */
    test('check if gets categorie responds with 200 and gets the correct rows when passing a categoriesoort', async (done) => {
        try {
            await request.get("/categorie/" + categoriesoort)
                .send({
                    categoriesoort: "Dankwoord"
                })
                .expect(200)
                .then((res) => {
                    done()
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
        }
    });

    /**
     *[Get ingediende formulieren van bepaalde categoriesoort zonder soort mee te geven]
     * @param: /
     * @returns: error (status 400 bad request)
     */
    test('check if gets categorie responds with 400 when send without categoriesoort', async (done) => {
        try {
            await request.get("/categorie/" + categoriesoort)
                .send({})
                .expect(400)
                .then((res) => {
                    done()
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
        }
    });
});

/**
 * [Get bepaalde data uit beide tables]
 * @param: /
 * @returns: Bepaalde data uit de tables (json, status 200 ok)
 */
describe('GET bepaalde endpoints', () => {
    test('/join returns data van beide tables', async (next) => {
        try {
            const response = await request.get('/join');
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            next();
        } catch (e) {}
    });
});

/**
 * [Get alle ingediende formulieren en alle data uit table categorie]
 * @param: /
 * @returns: Alle data uit de tables (json, status 200 ok)
 */
describe('GET alle endpoints', () => {
    test('/join returns alle data van beide tables', async (next) => {
        try {
            const response = await request.get('/joinAlles');
            expect(response.status).toBe(200);
            expect(response.body).toBeDefined();
            next();
        } catch (e) {}
    });
});

/**
 * [Post een formulier]
 * @param: {string} categoriesoort
 * @param: {string} voornaam
 * @param: {string} achternaam
 * @param: {string} email
 * @param: {string} bericht
 * @returns: row toegevoegd in database (status: 200 ok)
 */
describe('POST /test endpoint', () => {
    test('check if it responds with 201, if it got object', async (done) => {
        try {
            await request.post('/formulier')
                .send({
                    categoriesoort: "Dankwoord",
                    voornaam: "hallo",
                    achternaam: "hallo",
                    email: "hallo",
                    bericht: "hallo"
                })
                .expect(201)
                .then((res) => {
                    done()
                    console.log('inserted');
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
            done()
        }
    })

    /**
     * [Post een leeg formulier]
     * @param: niets
     * @returns: error (status: 400 bad request)
     */
    test('check if it responds with 400 when sent without data', async (done) => {
        try {
            await request.post('/formulier')
                .send([])
                .expect(400)
                .then((res) => {
                    console.log('Post niet gelukt');
                    done()
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
            done()
        }
    })
});

/**
 * [Delete een formulier]
 * @param: {number} id
 * @returns: row verwijderd uit database (status: 200 ok)
 */
describe(' DELETE /test endpoint', () => {
    let id;

    test('check if it responds with 200, if it deleted the object', async (done) => {
        try {
            await request.delete('/deleteVraag/' + id)
                .send({
                    id: '4'
                })
                .expect(200)
                .then((res) => {
                    done()
                    console.log('deleted');
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
            done()
        }
    })

    /**
     * [Delete een formulier zonder id]
     * @param: niets
     * @returns: error (status: 400 bad request)
     */
    test('check if it responds with 400 when sent without data', async (done) => {
        try {
            await request.delete('/deleteVraag/' + id)
                .send([])
                .expect(400)
                .then((res) => {
                    console.log('Delete niet gelukt');
                    done()
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
            done()
        }
    })
});

/**
 * [Update een formulier]
 * @param: {number} id
 * @returns: row geupdate in database (status: 200 OK)
 */
describe(' UPDATE /test endpoint', () => {
    let id;

    test("responds with 200 if ticket is updated", async (done) => {
        try {
            const response = await request
                .patch("/updateVraag/" + id)
                .send({
                    categoriesoort: "Probleem",
                    voornaam: "Test via update",
                    achternaam: "Test via update",
                    email: "test@test.be",
                    bericht: "Test via update",
                    id: "55"
                })
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    })

    /**
     * [Update een formulier zonder id]
     * @param: niets
     * @returns: error (status: 400 bad request)
     */
    test('check if it responds with 400 when sent without data', async (done) => {
        try {
            const response = await request
                .patch("/updateVraag/" + id)
                .send([])
                .expect(400)
                .then((res) => {
                    console.log('Update niet gelukt');
                    done()
                });
        } catch (e) {
            if (e) console.log(e);
            done(e)
            done()
        }
    })
});