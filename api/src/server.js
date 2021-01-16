const express = require('express')
const bodyParser = require('body-parser');
const http = require('http');
const {
  Pool
} = require("pg");

const port = 3000

// Connectie maken met de database
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
  console.log("test");
  res.status(200).send();
});

/**
 * [Initialiseer tables als deze nog niet bestaan]
 * @param: /
 * @returns: /
 */
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
            await pg.table('vragen').insert({
              categoriesoort,
              voornaam,
              achternaam,
              email,
              bericht,
              id: `random element number ${i}`
            })
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

/**
 * [Get alle ingediende formulieren]
 * @param: /
 * @returns: Alle vragen (json, status 200 ok)
 */
app.get('/alleVragen', async (req, res) => {
  const result = await pg
    .select(['categoriesoort', 'voornaam', 'achternaam', 'email', 'bericht'])
    .from('vragen')
  console.log("De vragen in de database zijn " + (JSON.stringify(result)));
  res.json({
    res: result
  })
})

/**
 * [Get alle ingediende formulieren van bepaalde categoriesoort]
 * @param: {string} categoriesoort
 * @returns: Alle vragen met bepaalde categoriesoort (json, status 200 ok) of error (status 400 bad request)
 */
app.get('/categorie/:categoriesoort', async (req, res) => {

  if (!req.body.categoriesoort) {
    return res.status(400).send({
      'message': 'Categorie is missing'
    });
  }

  const result = await pg
    .select(['voornaam', 'achternaam', 'email', 'bericht'])
    .from('vragen')
    .where({
      categoriesoort: req.body.categoriesoort
    })
  res.json({
    res: result
  })
})

/**
 * [Post een formulier]
 * @param: {string} categoriesoort
 * @param: {string} voornaam
 * @param: {string} achternaam
 * @param: {string} email
 * @param: {string} bericht
 * @returns: row toegevoegd in database (status: 200 ok) of error (status 400 bad request)
 */
app.post('/formulier', async (req, res) => {

  if (!req.body.categoriesoort || !req.body.voornaam || !req.body.achternaam || !req.body.email || !req.body.bericht) {
    return res.status(400).send({
      'message': 'Some values are missing'
    });
  }

  const {
    categoriesoort,
    voornaam,
    achternaam,
    email,
    bericht
  } = req.body

  client.query(
    'INSERT INTO vragen (categoriesoort, voornaam, achternaam, email, bericht) VALUES ($1, $2, $3, $4, $5)',
    [categoriesoort, voornaam, achternaam, email, bericht],
    (error) => {
      if (error) {
        throw error
      }
      console.log(categoriesoort, voornaam, achternaam, email, bericht);
      res.status(201).json({
        status: 'success',
        message: 'Insert goed gelukt'
      })
    },
  )
})

/**
 * [Get data van beide tables]
 * @param: /
 * @returns: get alle ingediende formulieren met categoriestoorten met data id, categoriesoort, tijd en bericht (status: 200 ok of status: 400 bad request)
 */
app.get('/join', async (req, res) => {
  await pg
    .from('vragen')
    .join('categorie', 'vragen.categoriesoort', 'categorie.categoriesoort')
    .select(['vragen.id', 'categorie.categoriesoort', 'vragen.created_at', 'vragen.bericht'])
    .then(data => {
      res.json({
        res: data
      });
      console.log(data);
    })
});

/**
 * [Delete een formulier]
 * @param: {number} id
 * @returns: row verwijderd uit database (status: 200 ok) of (status: 400 bad request)
 */
app.delete('/deleteVraag/:id', async (req, res) => {

  if (!req.body.id) {
    return res.status(400).send({
      'message': 'Id is missing'
    });
  }

  client.query(
    `DELETE FROM vragen WHERE id=$1`,
    [req.body.id],
    (error) => {
      if (error) {
        throw error
      }
      console.log("deleted row with id = " + req.body.id);
      res.status(200).json({
        status: 'success',
        message: 'delete goed gelukt'
      })
    },
  )
});

/**
 * [Update een formulier]
 * @param: {number} id
 * @returns: row geupdate in database (status: 200 OK) of (status: 400 bad request)
 */
app.patch("/updateVraag/:id", (req, res) => {

  if (!req.body.id) {
    return res.status(400).send({
      'message': 'Id is missing'
    });
  }

  client.query(
    `UPDATE vragen SET categoriesoort = $1, voornaam = $2, achternaam = $3, email = $4, bericht = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6`,
    [req.body.categoriesoort, req.body.voornaam, req.body.achternaam, req.body.email, req.body.bericht, req.body.id],
    (error) => {
      if (error) {
        throw error
      }
      console.log("updated row with id = " + req.body.id);
      res.status(200).json({
        status: 'success',
        message: 'update goed gelukt'
      })
    },
  )
});

initialiseTables()

module.exports = app;