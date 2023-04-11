import { FastifyReply, FastifyRequest } from "fastify";

import { registerUseCase } from "@/useCases/register";

import { z as zod } from "zod";

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

  await registerUseCase({ name, email, password });

  return response.status(201).send();
};
