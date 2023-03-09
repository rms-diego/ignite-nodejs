import http from "node:http";

import { randomUUID } from "node:crypto";

const users = [];

const server = http.createServer(async (request, response) => {
  const { method, url } = request;
  response.setHeader("content-type", "application/json");

  const buffers = [];

  for await (const chunk of request) {
    buffers.push(chunk);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    request.body = null;
  }

  if (method === "GET" && url === "/users") {
    return response.end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    const { name, email } = request.body;

    users.push({
      id: randomUUID(),
      name,
      email,
    });

    return response.writeHead(201).end();
  }

  return response
    .writeHead(404)
    .end(JSON.stringify({ error: "endpoint not found" }));
});

server.listen(3000, () => console.log("Server up"));
