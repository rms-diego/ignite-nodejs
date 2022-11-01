import { Request, Response } from "express";
import app from "./app";

const PORT = 5000;

app.get("/", (req: Request, res: Response) =>
  res.status(200).json({ message: "Hello world !" })
);

app.listen(PORT, () => console.log(`Server up\nPORT: ${PORT}`));
