import { Request, Response, Router } from "express";
import crypto from "crypto";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/categories", (req: Request, res: Response) => {
  const { name, description } = req.body;

  const category = {
    id: crypto.randomUUID(),
    name,
    description,
    created_At: new Date().toLocaleTimeString(),
  };

  categories.push(category);

  return res.status(201).json(categories);
});

export { categoriesRoutes };
