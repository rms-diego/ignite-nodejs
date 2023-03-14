import { knex as knexConfig, Knex } from "knex";

const { DATABASE_DEV } = process.env;

export const config: Knex.Config = {
  client: "sqlite",
  connection: {
    filename: DATABASE_DEV as string,
  },
  useNullAsDefault: true,
  migrations: {
    extension: "ts",
    directory: "./db/migrations",
  },
};

export const knex = knexConfig(config);
