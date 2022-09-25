import express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.status(200).send("olá mundo !"));

app.post("/course", (req, res) => {
  const { name } = req.body;
  return res.status(200).json({ name });
});

app.listen(3333, () =>
  console.log("Server is running!\nhttp://localhost:3333")
);
