import { ICategoryRepository } from "../repositories/ICategoryRepository";

interface ICreateCategory {
  name: string;
  description: string;
}

class CategoriesService {
  constructor(private repository: ICategoryRepository) {}

  createCategory({ name, description }: ICreateCategory) {
    const categoryExists = this.repository.findByName(name);

    if (categoryExists) throw new Error("category already exists");

    const categoryCreated = this.repository.create({
      name,
      description,
    });

    return categoryCreated;
  }

  getAll = () => this.repository.getAll();
}

export { CategoriesService };
