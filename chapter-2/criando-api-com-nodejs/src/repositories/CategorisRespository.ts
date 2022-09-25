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
    const categoryExists = this.categories.find(
      (category) => category.name === name
    );

    return categoryExists;
  }
}

export default new CategoryRepository();
