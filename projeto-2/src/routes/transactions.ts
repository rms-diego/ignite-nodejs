import { FastifyInstance } from "fastify";

import { validateSessionId } from "../middleware/validateSessionId";

import * as controller from "../controller/transactions.controller";

export const transactionsRoutes = async (app: FastifyInstance) => {
  app.addHook("preHandler", validateSessionId);

  app.get("/findMany", controller.findMany);

  app.get("/findOne/:id", controller.findOne);

  app.get("/summary", controller.summary);

  app.post("/create", controller.create);
};
