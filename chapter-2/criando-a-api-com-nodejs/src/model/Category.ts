import { ICategory } from "../@types";
import crypto from "crypto";

class Category implements ICategory {
  id: string;
  name: string;
  description: string;
  created_at: string;

  constructor({ id, name, description, created_at }: ICategory) {
    if (id) this.id = id;

    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.created_at = created_at;
  }
}

export { Category };
