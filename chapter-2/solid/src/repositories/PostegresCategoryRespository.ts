import { Category } from "../model/Category";
import { ICategoryRepository, ICreateCategoryDTO } from "./ICategoryRepository";

class PostegresCategoryRespository implements ICategoryRepository {
  create({ name, description }: ICreateCategoryDTO): Category {
    throw new Error("Method not implemented.");
  }
  getAll(): Category[] {
    throw new Error("Method not implemented.");
  }
  findByName(name: string): Category {
    throw new Error("Method not implemented.");
  }
}

export { PostegresCategoryRespository };
