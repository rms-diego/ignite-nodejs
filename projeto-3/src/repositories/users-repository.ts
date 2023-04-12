import { Prisma, PrismaClient } from "@prisma/client";

export class UsersRepository {
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

  async create({ name, passwordHash, email }: Prisma.UserCreateInput) {
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
