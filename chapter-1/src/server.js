const express = require("express");

const app = express();

app.get("/", (request, response) => {
  return response.status(200).json({ message: "Hello world!" });
});

app.listen(3333, () => console.log("server up 🚀\nhttp://localhost:%s", 3333));
