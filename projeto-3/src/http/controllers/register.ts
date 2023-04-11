import { FastifyReply, FastifyRequest } from "fastify";

import { z as zod } from "zod";
import bcrypt from "bcrypt";

import { client } from "@/lib/prisma";

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

  const userAlreadyExists = await client.user.findUnique({ where: { email } });

  if (userAlreadyExists) {
    return response.status(409).send({ error: "User already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 6);

  await client.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return response.status(201).send();
};
