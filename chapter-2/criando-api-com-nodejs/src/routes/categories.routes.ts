import { Router } from "express";

import CategoryRepository from "../repositories/CategorisRespository";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const categoryExists = CategoryRepository.findByName(name);

  if (categoryExists) {
    return res.status(400).json({ error: "category already exists" });
  }

  const categoryCreated = CategoryRepository.create({
    name,
    description,
  });

  return res.status(201).json(categoryCreated);
});

categoriesRoutes.get("/getAll", (req, res) => {
  const allCategories = CategoryRepository.getAll();

  return res.status(200).json(allCategories);
});

export { categoriesRoutes };
