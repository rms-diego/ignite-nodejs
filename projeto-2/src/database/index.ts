import { knex as knexConfig } from "knex";

const { DATABASE_DEV } = process.env;

export const knex = knexConfig({
  client: "sqlite",
  connection: {
    filename: DATABASE_DEV as string,
  },
});
