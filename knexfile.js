// Update with your config settings.

require("dotenv").config();
const pg = require("pg");
pg.defaults.ssl = true;

const localPGConnection = {
  host: "localhost", //change to postgres server
  database: "users",
  user: "", // Need credentials from user
  password: ""
};

const prodDbConnection = process.env.DATABASE_URL || localPGConnection;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    migrations: {
      directory: './data/migrations'
    }
  },

  production: {
    client: "pg",
    connection: 
      {host: prodDbConnection},
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./data/migrations"
    },
  }
};
