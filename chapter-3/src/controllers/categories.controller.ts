import { Request, Response } from "express";

import { categoriesRepository } from "../repositories/Categories.repository";

class CategoriesController {
  static createCategory(request: Request, response: Response) {
    const { name, description } = request.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      return response
        .status(400)
        .json({ error: "This category already exists" });
    }

    categoriesRepository.create({ name, description });

    return response.status(201).json({ message: "Category created" });
  }

  static listCategories(_request: Request, response: Response) {
    const categories = categoriesRepository.getCategories();

    return response.status(200).json(categories);
  }
}

export { CategoriesController };
