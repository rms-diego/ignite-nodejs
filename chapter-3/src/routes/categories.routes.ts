import { Router } from "express";

import { CategoriesController } from "../controllers/categories.controller";

const categoriesRoutes = Router();

categoriesRoutes.post(
  "/categories/create",
  CategoriesController.createCategory
);

export { categoriesRoutes };
