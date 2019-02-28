require("dotenv").config();

const pg = require("pg");
pg.defaults.ssl = true;

module.exports = {
  // For Knex CLI only (use config named "server" for actual dev use) - need to do this for file pathing
  development: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations"
    },
    seeds: {
      directory: "./seeds"
    }
    // Will not turn on foreign key constraints to enable deletion (this is needed to allow seeds to run)
  },

  // For actual dev use
  devServer: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    useNullAsDefault: true,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./data/migrations"
    },
    seeds: {
      directory: "./data/seeds"
    }
  }
};
