import { Request, Response } from "express";

import { categoriesRepository } from "../repositories/Categories.repository";

class CategoriesController {
  static createCategory(request: Request, response: Response) {
    const { name, description } = request.body;

    categoriesRepository.create({ name, description });

    console.log(categoriesRepository.getCategories());

    return response.status(201).json({ message: "Category created" });
  }
}

export { CategoriesController };
