const app = require("express")();

const courses = ["curso 1", "curso 2", "curso 3", "curso 4"];

app.get("/courses", (req, res) => {
  return res.json(courses);
});

app.post("/courses", (req, res) => {
  courses.push(`curso ${courses.length + 1}`);
  return res.json(courses);
});

app.put("/courses/:id", (req, res) => {
  return res.json(["curso 6", "curso 2", "curso 3", "curso 4"]);
});

app.delete("/courses/:id", (req, res) => {
  return res.json(["curso 2", "curso 3", "curso 4"]);
});

app.listen(3333, () =>
  console.log(`Server up !🚀\nLink: http://localhost:3333`)
);
