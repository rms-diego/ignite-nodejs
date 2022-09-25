import express, { Request, Response } from "express";

const app = express();

app.get("/", (request: Request, response: Response) =>
  response.status(200).send("hello world typescript")
);

app.listen(3333, () => console.log("Server up 🚀\nhttp://localhost:3333"));
