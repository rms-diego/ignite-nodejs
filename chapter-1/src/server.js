const express = require("express");

const app = express();
app.use(express.json());

app.get("/courses", (request, response) => {
  const { query } = request;

  console.log(query);
  return response.status(200).json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (request, response) => {
  const { body } = request;

  console.log(body);
  return response.status(200).json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
});

app.put("/courses/:id", (request, response) => {
  const { params: { id } } = request;

  console.log(id);
  return response.status(200).json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
});

app.patch("/courses/:id", (request, response) => {
  return response.status(200).json(["Curso 6", "Curso 7", "Curso 3", "Curso 4"]);
});

app.delete("/courses/:id", (request, response) => {
  return response.status(200).json(["Curso 6", "Curso 7", "Curso 4"]);
});

app.listen(3333, () => console.log("server up 🚀\nhttp://localhost:%s", 3333));
