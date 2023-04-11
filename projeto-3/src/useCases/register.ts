import { UsersRepository } from "@/repositories/users-repository";

import { Exception } from "@/Exception";

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
    throw new Exception("User already exists", 409);
  }

  const passwordHash = await bcrypt.hash(password, 6);

  await UsersRepository.create({ name, email, passwordHash });
};
