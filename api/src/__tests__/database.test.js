const { Pool } = require('pg');
const supertest = require('supertest');
const app = require('./../server.js');
const app2 = require('./../../html/contact.js');

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

describe('GET / endpoint', () => {
  test('check if it responds with 200, if it got the object', async (done) => {
    try{
        await request.get('/get/:alleVragen')
        .expect(200)
        .then((res) => {
            done()
            console.log('get all records');
        });
    } catch(e){
    if(e) console.log(e); done(e)
    done()
    } 
})
});

describe('POST /test endpoint', () => {
    test('check if it responds with 201, if it got object', async (done) => {
        try{
            await request.post('/post/formulier')
            .send({
                categoriesoort_id: "0", 
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
        } catch(e){
        if(e) console.log(e); done(e)
        done()
        }
    })
});

describe(' DELETE /test endpoint', () => {
    
    test('check if it responds with 200, if it deleted the object', async (done) => {
        try{
            await request.delete('/delete/:id')
            .send({
                id: '4'
              })
            .expect(200)
            .then((res) => {
                done()
                console.log('deleted');
            });
        } catch(e){
        if(e) console.log(e); done(e)
        done()
        }
    })
})

describe(' UPDATE /test endpoint', () => {

    test('UPDATE gegevens van gebruiker met id 2', async done => {
        try{
            await request.patch('/update/:id')
            .send({
                categoriesoort_id: "1", 
                categoriesoort: "Probleem",
                voornaam: "Test via update", 
                achternaam: "Test via update",
                email: "test@test.be",
                bericht: "Test via update",
                id: "2"
              })
            .expect(200)
            .then((res) => {
                done()
                console.log('updated');
            });
        } catch(e){
        if(e) console.log(e); done(e)
        done()
        }
    })
})