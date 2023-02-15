import { Request, Response } from "express";
import { Category } from "../model/Category";

const categories: Category[] = [];

class CategoriesController {
  static createCategory(request: Request, response: Response) {
    const { name, description } = request.body;

    const category = new Category({ name, description });

    categories.push({ ...category });

    console.log(category);

    return response.status(201).json({ message: "Category created" });
  }
}

export { CategoriesController };
