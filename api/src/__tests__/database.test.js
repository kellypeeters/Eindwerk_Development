const { Pool } = require('pg');
const supertest = require('supertest');
const app = require('./../server.js');

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

/*describe('POST', () => {
    test('Should return single post after insert', async () => {
        const res = await request.post('/test')
        .send({ uuid: /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/, content: 'test' });
  
      expect(res.status).toEqual(200);
      expect(res.body.data).toBeDefined();
      console.log('woohoow');
    });
  });*/