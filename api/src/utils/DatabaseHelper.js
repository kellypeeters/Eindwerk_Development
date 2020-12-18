/* const initialiseTables = async() => {
    const pg = require('knex')({
      client: 'pg',
      version: '9.6',
      searchPath: ['knex', 'public'],
      connection: process.env.PG_CONNECTION_STRING ? process.env.PG_CONNECTION_STRING : 'postgres://example:example@localhost:5432/climatelocator'
    });
  
    await pg.schema.hasTable('year').then(async (exists) => {
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
            console.log('created table year');
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
          });
  
      }
    });
  } 
  
  module.exports = initialiseTables; */