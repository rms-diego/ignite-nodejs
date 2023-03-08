import http from "node:http";

import { randomUUID } from "node:crypto";

const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === "GET" && url === "/users") {
    return response
      .setHeader("content-type", "application/json")
      .end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: randomUUID(),
      name: "Diego Ramos",
      email: "diegoramos@email.com",
    });

    return response.end();
  }

  return response.end("Hello world!");
});

server.listen(3000, () => console.log("Server up"));
