import { Router } from "express";

import { CategoriesController } from "../controllers/categories.controller";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "/categories/create",
  CategoriesController.createCategory
);

categoriesRoutes.get("/categories/list", CategoriesController.listCategories);

export { categoriesRoutes };
