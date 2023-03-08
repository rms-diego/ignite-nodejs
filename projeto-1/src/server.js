import http from "node:http";

const server = http.createServer((request, response) => {
  console.log(request.method);
  return response.end("Hello world!");
});

server.listen(3000, () => console.log("Server up"));
