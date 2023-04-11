import { client } from "@/lib/prisma";

import bcrypt from "bcrypt";

type RegisterUseCaseDTO = {
  name: string;
  email: string;
  password: string;
};

export const registerUseCase = async ({
  name,
  email,
  password,
}: RegisterUseCaseDTO) => {
  const userAlreadyExists = await client.user.findUnique({ where: { email } });

  if (userAlreadyExists) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 6);

  await client.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });
};
