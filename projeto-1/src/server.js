import http from "node:http";

import { randomUUID } from "node:crypto";

const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  response.setHeader("content-type", "application/json");

  if (method === "GET" && url === "/users") {
    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: randomUUID(),
      name: "Diego Ramos",
      email: "diegoramos@email.com",
    });

    return response.writeHead(201).end();
  }

  return response
    .writeHead(404)
    .end(JSON.stringify({ error: "endpoint not found" }));
});

server.listen(3000, () => console.log("Server up"));
