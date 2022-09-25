import { Router } from "express";
import { randomUUID as uuid } from "crypto";

const categoriesRoutes = Router();

const categories = [];

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const category = { id: uuid(), name, description };

  categories.push(category);

  return res.status(201).end();
});

export { categoriesRoutes };
