import crypto from "crypto";

class Category {
  id?: string;
  name: string;
  description: string;
  created_at: string;

  constructor({ id, name, description, created_at }: Category) {
    if (id) this.id = id;

    this.id = crypto.randomUUID();
    this.name = name;
    this.description = description;
    this.created_at = created_at;
  }
}

export { Category };
