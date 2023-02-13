const express = require("express");

const app = express();

app.get("/", (request, response) =>
  response.json({ message: "hello world - ignite nodejs" })
);

app.listen(3333, () => console.log(`Server up on port ${3333}`));
