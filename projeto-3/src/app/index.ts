import { routes } from "@/routes";
import fastify from "fastify";

const app = fastify({
  logger: true,
});

app.register(routes);

export { app };
