
const express = require('express')
const bodyParser = require('body-parser');
const http = require('http');
const { Pool } = require("pg");

const port = 3000

  const pg = require('knex')({
    client: 'pg',
    version: '9.6',      
    searchPath: ['knex', 'public'],
    connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/test'
  });

  const client = new Pool({
    user: "example",
    host: "localhost",
    database: "test",
    password: "example",
    port: "5432"
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
    .select(['id', 'created_at'])
    .from('categorie')
  res.json({
      res: result
  })
})

app.get('/categorie/:id', async (req, res) => {
  const result = await pg
    .select(['id', 'created_at'])
    .from('categorie')
    .where({id: req.params.id})
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
          table.string('categoriesoort');
          table.string('voornaam');
          table.string('achternaam');
          table.string('email');
          table.string('bericht');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table vragen');
           for (let i = 0; i < 10; i++) {
            await pg.table('vragen').insert({ categoriesoort, voornaam, achternaam, email, bericht, id: `random element number ${i}` })
          }
        });

    }
  });
  await pg.schema.hasTable('categorie').then(async (exists) => {
    if (!exists) {
      await pg.schema
        .createTable('categorie', (table) => {
          table.increments();
          table.string('categoriesoort');
          table.string('summary');
          table.timestamps(true, true);
        })
        .then(async () => {
          console.log('created table categorie');
        });
        
    }
  });
}

app.get('/get/:alleVragen', async (req, res) => {
  const result = await pg
    .select(['categoriesoort', 'voornaam', 'achternaam', 'email', 'bericht'])
    .from('vragen')
    console.log(result);
  res.json({
      res: result
  })
})

app.post('/post/formulier', async (req, res) => {

  const {categoriesoort, voornaam, achternaam, email, bericht} = req.body

   client.query(
    'INSERT INTO vragen (categoriesoort, voornaam, achternaam, email, bericht) VALUES ($1, $2, $3, $4, $5)',
    [categoriesoort, voornaam, achternaam, email, bericht],
    (error) => {
      if (error) {
        throw error
      }
      console.log(categoriesoort, voornaam, achternaam, email, bericht);
      res.status(201).json({status: 'success', message: 'Insert goed gelukt'})
    },
  )
}) 

app.delete('/delete/:id', async (req, res) => {

  client.query(
   `DELETE FROM vragen WHERE id=$1`,
   [req.body.id],
   (error) => {
     if (error) {
       throw error
     }
     console.log("deleted row with id" + req.body.id);
     res.status(200).json({status: 'success', message: 'delete goed gelukt'})
   }, 
 )
});

initialiseTables()

module.exports = app;