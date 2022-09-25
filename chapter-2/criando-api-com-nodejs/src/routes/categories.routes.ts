import { Router } from "express";

import CategoryRepository from "../repositories/CategorisRespository";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const categoryCreated = CategoryRepository.create({
    name,
    description,
  });

  return res.status(201).json(categoryCreated);
});

export { categoriesRoutes };
