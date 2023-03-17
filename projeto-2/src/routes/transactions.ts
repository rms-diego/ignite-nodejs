import { FastifyInstance } from "fastify";
import { z as zod } from "zod";

import { knex } from "../database";

import { randomUUID } from "crypto";

const createTransactionBodySchema = zod.object({
  title: zod.string(),
  amount: zod.number(),
  type: zod.enum(["debit", "credit"]),
});

const findOneTransactionParamSchema = zod.object({
  id: zod.string().uuid(),
});

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.get("/findMany", async () => {
    const allTransactions = await knex("transactions").select();

    return { transactions: allTransactions };
  });

  app.get("/findOne/:id", async (request) => {
    const { id } = findOneTransactionParamSchema.parse(request.params);

    const transaction = await knex("transactions").first().where({ id });

    return { transaction };
  });

  app.get("/summary", async () => {
    const summary = await knex("transactions")
      .first()
      .sum("amount", { as: "amount" });

    return { summary };
  });

  app.post("/create", async (request, response) => {
    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    );

    const amountTransaction = type === "credit" ? amount : amount * -1;

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      const oneWeekInMilliseconds = 1000 * 60 * 60 * 24 * 7; // 7 days

      response.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: oneWeekInMilliseconds,
      });
    }

    await knex("transactions").insert({
      id: randomUUID(),
      title,
      amount: amountTransaction,
      session_id: sessionId,
    });

    return response.status(201).send();
  });
};
