import { Router } from "express";

import { categoriesRoutes } from "./categories.routes";

const routes = Router();

routes.get("/", (request, response) =>
  response.json({ message: "hello world !" })
);

routes.use(categoriesRoutes);

export { routes };
