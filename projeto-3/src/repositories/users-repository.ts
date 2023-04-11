import { client } from "@/lib/prisma";

import { Prisma } from "@prisma/client";

export class UsersRepository {
  static async findByEmail(email: string) {
    const userFound = await client.user.findUnique({
      where: { email },
    });

    return userFound;
  }

  static async create({ name, passwordHash, email }: Prisma.UserCreateInput) {
    const userCreated = await client.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return userCreated;
  }
}
