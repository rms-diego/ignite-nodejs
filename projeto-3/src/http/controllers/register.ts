import { FastifyReply, FastifyRequest } from "fastify";

import { RegisterUseCase } from "@/useCases/register";

import { client } from "@/lib/prisma";

import { z as zod } from "zod";
import { UsersRepository } from "@/repositories/prisma/users-repository";

export const register = async (
  request: FastifyRequest,
  response: FastifyReply
) => {
  const createUserSchema = zod.object({
    name: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
  });

  const { name, email, password } = createUserSchema.parse(request.body);

  const usersRepository = new UsersRepository(client);
  const registerUseCase = new RegisterUseCase(usersRepository);

  await registerUseCase.execute({ name, email, password });

  return response.status(201).send();
};
