import { UsersRepository } from "@/repositories/users-repository";

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
  const userAlreadyExists = await UsersRepository.findByEmail(email);

  if (userAlreadyExists) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 6);

  await UsersRepository.create({ name, email, passwordHash });
};
