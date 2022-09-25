import { Category } from "../model/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

class CategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category({
      name,
      description,
      createdAt: new Date().toLocaleString(),
    });

    this.categories.push({ ...category });

    return { ...category };
  }

  getAll = () => this.categories;

  findByName(name: string) {
    const categoryFinded = this.categories.find(
      (category) => category.name === name
    );

    return categoryFinded;
  }
}

export { CategoriesRepository };
