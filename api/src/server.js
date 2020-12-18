
const express = require('express')
const bodyParser = require('body-parser');
const http = require('http');
const Helpers = require('./utils/helpers.js')
const { Pool } = require("pg");

const port = 3000

/*const client = new Pool({
    user: "example",
    host: "localhost",
    database: "test",
    password: "example",
    port: "5432"
  });*/

  const pg = require('knex')({
    client: 'pg',
    version: '9.6',      
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
  });

  const app = express();
http.Server(app); 


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);  

app.get('/test', (req, res) => {

  res.status(200).send();
})
app.get('/', async (req, res) => {
  const result = await pg
    .select(['uuid', 'title', 'created_at'])
    .from('categorie')
  res.json({
      res: result
  })
})

app.get('/categorie/:uuid', async (req, res) => {
  const result = await pg
    .select(['uuid', 'title', 'created_at'])
    .from('categorie')
    .where({uuid: req.params.uuid})
  res.json({
      res: result
  })
})


async function initialiseTables() {
  await pg.schema.hasTable('vragen').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('vragen', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('content');
          table.string('categorie_id');
          table.integer('order');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table vragen');
        });

    }
  });
  await pg.schema.hasTable('categorie').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('categorie', (table) => {
          table.increments();
          table.uuid('uuid');
          table.string('categoriesoort');
          table.string('summary');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table categorie');
          for (let i = 0; i < 10; i++) {
            const uuid = Helpers.generateUUID();
            await pg.table('categorie').insert({ uuid, title: `random element number ${i}` })
          }
        });
        
    }
  });
}
initialiseTables()

module.exports = app;