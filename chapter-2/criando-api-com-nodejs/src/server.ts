import express from "express";

const app = express();

app.get("/", (req, res) => res.status(200).send("olá mundo !"));

app.listen(3333, () =>
  console.log("Server is running!\nhttp://localhost:3333")
);
