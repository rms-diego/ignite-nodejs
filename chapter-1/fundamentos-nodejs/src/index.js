const express = require("express");

const app = express();

app.use(express.json());

const courses = ["curso 1", "curso 2", "curso 3", "curso 4"];

app.get("/courses", (req, res) => {
  const { teste } = req.query;

  console.log(teste);
  return res.json(courses);
});

app.post("/courses", (req, res) => {
  const { name } = req.body;
  courses.push(name);

  return res.json(courses);
});

app.put("/courses/:id", (req, res) => {
  const { id } = req.params;

  console.log(id);
  return res.json(["curso 6", "curso 2", "curso 3", "curso 4"]);
});

app.delete("/courses/:id", (req, res) => {
  return res.json(["curso 2", "curso 3", "curso 4"]);
});

app.listen(3333, () =>
  console.log(`Server up !🚀\nLink: http://localhost:3333`)
);
