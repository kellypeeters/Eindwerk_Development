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

/**
* [Get alle ingediende formulieren]
* @param: 
* @returns:
*/
describe('GET / endpoint', () => {
  test('check if it responds with 200, if it got the object', async (done) => {
    try{
        await request.get('/alleVragen')
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

/**
* [Post een formulier]
* @param: {string} categoriesoort
* @param: {string} voornaam
* @param: {string} achternaam
* @param: {string} email
* @param: {string} bericht
* @returns: row toegevoegd in database
*/
describe('POST /test endpoint', () => {
    test('check if it responds with 201, if it got object', async (done) => {
        try{
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
        } catch(e){
        if(e) console.log(e); done(e)
        done()
        }
    })

    test('check if it responds with 400 when sent without data', async (done) => {
        try{
            await request.post('/formulier')
            .send([])
            .expect(400)
            .then((res) => {
                console.log('Post niet gelukt');
                done()
            });
        } catch(e){
        if(e) console.log(e); done(e)
        done()
        }
    })
});

/**
* [Post een formulier]
* @param: {number} id
* @returns: row verwijderd uit database
*/
describe(' DELETE /test endpoint', () => {
    
    test('check if it responds with 200, if it deleted the object', async (done) => {
        try{
            await request.delete('/id')
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

    test('check if it responds with 400 when sent without data', async (done) => {
        try{
            await request.delete('/id')
            .send([])
            .expect(400)
            .then((res) => {
                console.log('Delete niet gelukt');
                done()
            });
        } catch(e){
        if(e) console.log(e); done(e)
        done()
        }
    })
});

describe(' UPDATE /test endpoint', () => {

    test('UPDATE gegevens van gebruiker met id 2', async done => {
        try{
            await request.patch('/id')
            .send({
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
    
    test('check if it responds with 400 when sent without data', async (done) => {
        try{
            await request.patch('/id')
            .send([])
            .expect(400)
            .then((res) => {
                console.log('Update niet gelukt');
                done()
            });
        } catch(e){
        if(e) console.log(e); done(e)
        done()
        }
    })
});