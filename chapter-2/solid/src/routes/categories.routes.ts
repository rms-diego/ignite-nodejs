import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoryRespository";
import { CategoriesService } from "../service/Categories.service";

const categoriesRoutes = Router();

const categoryRepository = new CategoriesRepository();

categoriesRoutes.post("/", (req, res) => {
  try {
    const { name, description } = req.body;

    const categoryService = new CategoriesService(categoryRepository);

    const categoryCreated = categoryService.createCategory({
      name,
      description,
    });

    return res.status(201).json(categoryCreated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

categoriesRoutes.get("/getAll", (req, res) => {
  try {
    const categoryService = new CategoriesService(categoryRepository);

    const allCategories = categoryService.getAll();

    return res.status(200).json(allCategories);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export { categoriesRoutes };
