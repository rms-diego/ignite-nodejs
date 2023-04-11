import fastify from "fastify";

import { routes } from "@/http/routes";
import { errorHandler } from "@/http/error-handler";

const app = fastify({
  logger: true,
});

app.register(routes);
app.setErrorHandler(errorHandler);

export { app };
