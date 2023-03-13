import fastify from "fastify";

const app = fastify();

app.get("/", () => ({
  message: "hello world",
}));

app.listen({ port: 3333 }, () => console.log("Server running"));
