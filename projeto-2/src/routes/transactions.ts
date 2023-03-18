import { FastifyInstance } from "fastify";

import { validateSessionId } from "../middleware/validateSessionId";

import {
  create,
  findMany,
  findOne,
  summary,
} from "../controller/transactions.controller";

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.get("/findMany", { preHandler: [validateSessionId] }, findMany);

  app.get("/findOne/:id", { preHandler: [validateSessionId] }, findOne);

  app.get("/summary", { preHandler: [validateSessionId] }, summary);

  app.post("/create", create);
};
