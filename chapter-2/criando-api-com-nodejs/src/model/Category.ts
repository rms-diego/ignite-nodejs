import { randomUUID as uuid } from "crypto";

class Category {
  id?: string;
  name: string;
  description: string;
  createdAt: string;

  constructor({ name, description, createdAt }: Category) {
    if (!this.id) this.id = uuid();

    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
  }
}

export { Category };
