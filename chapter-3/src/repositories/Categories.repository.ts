import { Category } from "../model/Category";

import { CreateCategoryDTO } from "../@types";

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  public create({ name, description }: CreateCategoryDTO) {
    const category = new Category({ name, description });

    this.categories.push({ ...category });
  }

  public getCategories() {
    return this.categories;
  }
}

const categoriesRepository = new CategoriesRepository();

export { categoriesRepository };
