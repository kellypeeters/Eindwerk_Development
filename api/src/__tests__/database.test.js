const { Pool } = require('pg');
const supertest = require('supertest');
const app = require('./../server.js');
const app2 = require('./../../html/contact.js');

 const request = supertest(app);

describe('testing postgres', () => {

    let pgPool;

    beforeAll(() => {
        pgPool = new Pool({
            connectionString: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
        });
    });

    afterAll(async () => {
        await pgPool.end();
    });

    // test send to endpoint -> uuid is uitgekomen

    test('connection', async () => {
        const client = await pgPool.connect();
        try {
            await client.query('BEGIN');

            const { rows } = await client.query('SELECT * FROM categorie');
            expect(rows).toBeInstanceOf(Array);

        } catch(err) {
          throw err;
        } finally {
            client.release();
        }
    }) 

    test('full connect', async (done) => {
        const client = await pgPool.connect();
        try {
            let uuid = null;
            await request.post('/categorie') 
            .send({content: 'testing' })
            .expect(200)
            .then((res) => {
                // uuid = res.body[0].uuid
                done()
        }).catch((e) => {
          console.log(e);
    })
    await client.query('BEGIN');
   // const {rows} = await client.query(`SELECT * FROM categorie WHERE uuid='${uuid}'`);
   // expect(rows).toBeInstanceOf(Array);
   // expect(rows.length).toBeGreaterThan(0);


} catch(err){
    throw err;
} finally {
    client.release();
}
    }) 
    test('full connect categorie', async (done) => {
        const client = await pgPool.connect();
        try {
            let uuid = null;
            await request.post('/categorie') 
            .send({ content: 'testing' })
            .expect(200)
            .then((res) => {
               // uuid = res.body[0].uuid
                done()
        }).catch((e) => {
          console.log(e);
    })
    await client.query('BEGIN');
    //const {rows} = await client.query(`SELECT * FROM categorie WHERE uuid='$uuid'`);
    //expect(rows).toBeInstanceOf(Array);
    //expect(rows.length).toBeGreaterThan(0); 


} catch(err){
    throw err;
} finally {
    client.release();
}
    }) 
})

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

describe(' POST /test endpoint', () => {
    
    test('check if it responds with 201, if it got object', async (done) => {
        try{
            await request.post('/post/formulier')
            .send({
                categoriesoort, voornaam, achternaam, email, bericht
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
                id: '1'
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
    
    /*test('check if it responds with 200, if it updated the object', async (done) => {
        try{
            await request.put('/update/:id')
            .send({
                voornaam : 'TestViaUpdate',
                id: '2'
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
    })*/
    test('UPDATE gegevens van gebruiker met id 2', async done => {
        try{
            await request.patch('/update/:id')
            .send({
                categoriesoort: "Dankwoord",
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