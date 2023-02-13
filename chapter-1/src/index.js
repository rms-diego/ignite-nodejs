const express = require("express");

const app = express();
app.use(express.json());

const courses = ["course 1", "course 2", "course 3", "course 4", "course 5"];

app.get("/course", (request, response) => {
  const { page, order } = request.query;

  console.log(page);
  console.log(order);

  return response.json(courses);
});

app.post("/course", (request, response) => {
  const { name } = request.body;

  console.log(name);

  courses.push("course 6");

  return response.json(courses);
});

app.put("/course/:id", (request, response) => {
  const { id } = request.params;

  console.log(id);

  return response.json([
    "course 5",
    "course 1",
    "course 4",
    "course 2",
    "course 3",
  ]);
});

app.delete("/course/:id", (request, response) => {
  return response.json(["course 1", "course 2", "course 3", "course 4"]);
});

app.listen(3333, () => console.log(`Server up on port ${3333}`));
