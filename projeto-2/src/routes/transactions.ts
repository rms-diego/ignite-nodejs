import { FastifyInstance } from "fastify";
import { knex } from "../database";

import { randomUUID } from "crypto";

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.get("/", async () => {
    const transaction = await knex("transactions")
      .insert({
        id: randomUUID(),
        title: "transação teste",
        amount: 1000,
      })
      .returning("*");

    return transaction;
  });
};
