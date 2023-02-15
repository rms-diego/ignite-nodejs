import { Request, Response } from "express";
import { CategoriesService } from "../service/Categories.service";

class CategoriesController {
  static createCategory(request: Request, response: Response) {
    try {
      const { name, description } = request.body;

      CategoriesService.createCategory({
        name,
        description,
      });

      return response.status(201).json({ message: "Category created" });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ error: error.message });
      }
    }
  }

  static listCategories(_request: Request, response: Response) {
    const categories = CategoriesService.getCategories();

    return response.status(200).json(categories);
  }
}

export { CategoriesController };
