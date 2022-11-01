import { Request, Response, Router } from "express";
import { Category } from "../model/Category";

const categoriesRoutes = Router();

const categories: Category[] = [];

categoriesRoutes.post("/categories", (req: Request, res: Response) => {
  const { name, description } = req.body;

  const category = new Category({
    name,
    description,
    created_at: new Date().toLocaleString(),
  });

  categories.push(category);

  return res.status(201).json(categories);
});

export { categoriesRoutes };
