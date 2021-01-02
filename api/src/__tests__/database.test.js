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

    //Krijg alle ingevulde formulieren via localhost:3000 en in console.log
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

app.post('/endpoint', function(req, res){
	var obj = {};
	console.log('body: ' + JSON.stringify(req.body));
	res.send(req.body);
});

//Post een formulier via deze file je hoeft enkel de woorden tussen "" te veranderen bij send
describe('POST /test endpoint', () => {
    test('check if it responds with 201, if it got object', async (done) => {
        try{
            await request.post('/post/formulier')
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
});

//Delete via deze file een ingediende form via id
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

//Update een ingediende form via deze file via id
describe(' UPDATE /test endpoint', () => {

    test('UPDATE gegevens van gebruiker met id 2', async done => {
        try{
            await request.patch('/update/:id')
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
})