import { Prisma, PrismaClient } from "@prisma/client";

import { UsersRepositoryInterface } from "../users-repository-interface";

export class UsersRepository implements UsersRepositoryInterface {
  private client: PrismaClient;

  constructor(client: PrismaClient) {
    this.client = client;
  }

  async findByEmail(email: string) {
    const userFound = await this.client.user.findUnique({
      where: { email },
    });

    return userFound;
  }

  async create({ name, email, passwordHash }: Prisma.UserCreateInput) {
    const userCreated = await this.client.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return userCreated;
  }
}
