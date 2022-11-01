import { Request, Response, Router } from "express";
import { CategoryRepository } from "../repositories/Category.repository";

const categoriesRoutes = Router();

const categoryRepository = new CategoryRepository();

categoriesRoutes.post("/categories", (req: Request, res: Response) => {
  const { name, description } = req.body;

  categoryRepository.create({
    name,
    description,
  });

  return res.status(201).end();
});

export { categoriesRoutes };
