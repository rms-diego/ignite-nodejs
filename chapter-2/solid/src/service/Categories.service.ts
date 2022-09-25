import { CategoriesRepository } from "../repositories/CategorisRespository";

interface ICreateCategory {
  name: string;
  description: string;
}

class CategoriesService {
  constructor(private repository: CategoriesRepository) {}

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
