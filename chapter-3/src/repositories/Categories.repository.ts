import { Category } from "../model/Category";

import { CreateCategoryDTO } from "../@types";

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: CreateCategoryDTO) {
    const category = new Category({ name, description });

    this.categories.push({ ...category });
  }

  getCategories() {
    return this.categories;
  }

  findByName(name: string) {
    return this.categories.find((category) => category.name === name);
  }
}

const categoriesRepository = new CategoriesRepository();

export { categoriesRepository };
