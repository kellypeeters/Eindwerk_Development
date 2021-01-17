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



describe('end-to-end test', () => {
    /**
     * [Post een formulier]
     * @param: {string} categoriesoort
     * @param: {string} voornaam
     * @param: {string} achternaam
     * @param: {string} email
     * @param: {string} bericht
     * @returns: row toegevoegd in database (status: 200 ok)
     */
    it("Maakt een vraag aan", async (done) => {
        try {
            const response = await request
                .post("/formulier")
                .send({
                    categoriesoort: "Probleem",
                    voornaam: "Kelly",
                    achternaam: "Peeters",
                    email: "kelly@outlook.com",
                    bericht: "Er is een technische fout"
                });
            expect(response.status).toBe(200);
            done();
        } catch (error) {}
    });

    /**
     * [Post een formulier]
     * @param: /
     * @returns: error (status: 400 bad request)
     */
    it('post een vraag zonder data', async (next) => {
        try {
            const response = await request
            .get("/formulier")
            .then((res) => {
                done()
                console.log('Post niet gelukt')
            })
            .expect(response.status).toBe(400)
            .next()
        } catch (e) {}
    });

    /**
     * [Delete een formulier]
     * @param: {number} id
     * @returns: row verwijderd uit database (status: 200 ok)
     */
    let id;

    it('check if it responds with 200, if it deleted the object', async (done) => {
        try {
            await request.delete('/deleteVraag/' + id)
                .send({
                    id: '112'
                })
                .expect(200)
                .then((res) => {
                    done()
                    console.log('Vraag deleted met id ' + id);
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
    it('check if it responds with 400 when sent without data', async (done) => {
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

    /**
     * [Update een formulier]
     * @param: {number} id
     * @returns: row geupdate in database (status: 200 ok)
     */
    it("updates een vraag", async (done) => {
        try {
            const response = await request
                .patch("/updateVraag/" + id)
                .send({
                    categoriesoort: "Probleem",
                    voornaam: "End",
                    achternaam: "To",
                    email: "end",
                    bericht: "test",
                    id: "90"
                })
                .then((res) => {
                    console.log('Updated vraag ' + id);
                    done()
                })
                .expect(response.status).toBe(200)
                .done()
        } catch (error) {}
    });

    /**
     * [Update een formulier]
     * @param: /
     * @returns: error (status: 400 bad request)
     */
    it('updates een vraag zonder id', async (next) => {
        try {
            const response = await request
            .get("/updateVraag/" + id)
            .then((res) => {
                console.log('Update niet gelukt')
                done()
            })
            .expect(response.status).toBe(400)
            .next()
        } catch (e) {}
    });
});