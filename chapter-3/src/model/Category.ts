import { randomUUID } from "crypto";

type CategoryDTO = {
  name: string;
  description: string;
};

class Category {
  id: string;
  name: string;
  description: string;
  createdAt: Date;

  constructor({ name, description }: CategoryDTO) {
    this.id = randomUUID();
    this.name = name;
    this.description = description;
    this.createdAt = new Date();
  }
}

export { Category };
