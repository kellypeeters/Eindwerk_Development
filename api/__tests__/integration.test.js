
const supertest = require ('supertest');
const { generateUUID } = require('../utils/helpers.js');
const app = require ('./../server.js');
const request = supertest(app);

describe(' GET /test endpoint', () => {

    test('check if it responds with 200, if it got the object', async (done) => {
        try{
            await request.get('/get/:uuid')
            .send({
                uuid: 'f610dab1-b000-48e4-b503-728cc06dd779'
              })
            .expect(200)
            .then((res) => {
                done()
                console.log('get');
            });
        } catch(e){
        if(e) console.log(e); done(e)
        done()
        }
    })

    test('check if it responds with 200, if it got the object', async (done) => {
        try{
            await request.get('/get/:allRecords')
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

    test('check if it responds with 400 when it sends without data', async (done) => {
        try{
            await request.get('get/:uuid')
            .send([])
            .expect(400)
            .then((res) => {
                done()
            });
        } catch(e){
        if(e) console.log(e); done(e)
        done()
        }
    })
})

describe(' POST /test endpoint', () => {
    
    test('check if it responds with 201, if it got object', async (done) => {
        try{
            await request.post('/post')
            .send({
                uuid: '9409e2be-a624-4096-93a3-ec99e69ac559',
                content: 'test'
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
            await request.post('/test')
            .send([])
            .expect(400)
            .then((res) => {
                expect(res.body).toScriptEqual({})
                done()
            });
        } catch(e){
        if(e) console.log(e); done(e)
        done()
        }
    })
})

describe(' DELETE /test endpoint', () => {
    
    test('check if it responds with 200, if it deleted the object', async (done) => {
        try{
            await request.delete('/delete/:uuid')
            .send({
                uuid: '2e158506-46b3-4113-a29c-479998d7bd71'
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