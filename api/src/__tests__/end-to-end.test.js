const {
    Pool
} = require('pg');
const supertest = require('supertest');
const app = require('../server.js');

describe("end to end test", () => {
    let id = "2";
    test("creates an organisation", async (done) => {
        try {
            await request.patch("/updateVraag/" + id)
                .send({
                    categoriesoort: "Probleem",
                    voornaam: "Test via update",
                    achternaam: "Test via update",
                    email: "test@test.be",
                    bericht: "Test via update"
                });
            expect(200);
            done();
        } catch (error) {}
    });
});