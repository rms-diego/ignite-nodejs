import { Request, Response } from "express";

interface Categories {
  name: string;
  description: string;
}

const categories: Categories[] = [];

class CategoriesController {
  static createCategory(request: Request, response: Response) {
    const { name, description } = request.body;

    categories.push({ name, description });
    console.log(categories);

    return response.status(201).json({ message: "Category created" });
  }
}

export { CategoriesController };
