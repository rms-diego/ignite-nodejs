import { Request, Response, Router } from "express";
import { CategoryRepository } from "../repositories/Category.repository";

const categoriesRoutes = Router();

const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/categories/create", (req: Request, res: Response) => {
  const { name, description } = req.body;

  const categoryExists = categoryRepository.findByName(name);

  if (categoryExists) return res.status(400).json({ error: "this category exists!" });

  categoryRepository.create({
    name,
    description,
  });

  return res.status(201).end();
});

categoriesRoutes.get("/categories/getAll", (_req: Request, res: Response) => {
  const categories = categoryRepository.getAll();

  return res.status(200).json(categories);
});

export { categoriesRoutes };
