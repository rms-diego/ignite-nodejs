import { env } from "./env";

import { app } from "./app";
import { knex } from "./database";

import { randomUUID } from "crypto";

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

app.listen({ port: env.PORT }, () => console.log("Server running"));
