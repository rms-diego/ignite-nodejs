import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO) {
    const category = new Category({
      name,
      description,
      created_at: new Date().toLocaleString(),
    });

    this.categories.push(category);
  }

  getAll(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    const categoryFinded = this.categories.find(
      (category) => category.name === name
    );

    return categoryFinded;
  }
}

export { CategoryRepository };
