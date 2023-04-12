import { Prisma, User } from "@prisma/client";

export interface UsersRepositoryInterface {
  findByEmail(email: string): Promise<User | null>;

  create({ name, email, passwordHash }: Prisma.UserCreateInput): Promise<User>;
}
