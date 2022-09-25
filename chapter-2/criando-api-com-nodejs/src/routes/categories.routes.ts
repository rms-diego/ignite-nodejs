import { Router } from "express";

import { Category } from "../model/Category";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const category = new Category({
    name,
    description,
    createdAt: new Date().toLocaleString(),
  });

  categories.push(category);

  return res.status(201).end();
});

export { categoriesRoutes };
