import { randomUUID } from "crypto";

import { CreateCategoryDTO } from "../@types";

class Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor({ name, description }: CreateCategoryDTO) {
    this.id = randomUUID();
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
  }
}

export { Category };
