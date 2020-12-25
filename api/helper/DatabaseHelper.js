
let db;
try {
  db = require('knex')({
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST || '127.0.0.1',
      user: process.env.POSTGRES_USER || 'example',
      password: process.env.POSTGRES_PASSWORD || 'example',
      database: process.env.POSTGRES_DB || 'test'
    },
    searchPath: ['knex', 'public']
  });

  async function initialiseTables() {
    await db.schema.hasTable('records').then(async (exists) => {
      if (!exists) {
        await db.schema
          .createTable('records', (table) => {
            table.increments();
            table.uuid('uuid');
            table.string('question');
            table.string('answer');
            table.timestamps(true, true);
          })
          .then(async () => {
            console.log('created table records');
          });

      }
    })
      .catch((e) => {
        console.log(e);
      })
  }
  initialiseTables()
}
catch (e) {
  console.log("could not start up")
}


module.exports = db