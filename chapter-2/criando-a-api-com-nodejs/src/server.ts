import { Request, Response } from "express";
import app from "./app";

const PORT = 5000;

app.get("/", (_req: Request, res: Response) =>
  res.status(200).json({ message: "Hello world !" })
);

app.post("/courses", (req: Request, res: Response) => {
  const { name } = req.body;

  return res.status(201).json({ name });
});

app.listen(PORT, () => console.log(`Server up\nPORT: ${PORT}`));
