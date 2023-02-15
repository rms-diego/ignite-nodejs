import { CreateCategoryDTO } from "../@types";

import { categoriesRepository } from "../repositories/Categories.repository";

class CategoriesService {
  static createCategory({ name, description }: CreateCategoryDTO) {
    const categoryAlreadyExists = categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("This category already exists");
    }

    return categoriesRepository.create({ name, description });
  }

  static getCategories() {
    return categoriesRepository.getCategories();
  }
}

export { CategoriesService };
