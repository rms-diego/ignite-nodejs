import { client } from "@/lib/prisma";
import { FastifyInstance } from "fastify";

import { z as zod } from "zod";

import bcrypt from "bcrypt";

export const routes = async (app: FastifyInstance) => {
  app.post("/users/create", async (request, response) => {
    const createUserSchema = zod.object({
      name: zod.string(),
      email: zod.string().email(),
      password: zod.string().min(6),
    });

    const { name, email, password } = createUserSchema.parse(request.body);

    const passwordHash = await bcrypt.hash(password, 5);

    await client.user.create({
      data: {
        name,
        email,
        passwordHash,
      },
    });

    return response.status(201).send();
  });
};
