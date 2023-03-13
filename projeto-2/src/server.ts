import fastify from "fastify";

const app = fastify();

app.get("/", () => "hello world");

app.listen({ port: 3333 }, () => console.log("Server running"));
