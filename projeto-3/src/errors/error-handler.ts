import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

import { Exception } from "@/errors/Exception";
import { ZodError } from "zod";

import { env } from "@/env";

export const errorHandler = async (
  error: FastifyError,
  _request: FastifyRequest,
  response: FastifyReply
) => {
  if (error instanceof Exception) {
    return response.status(error.statusCode).send({ error: error.message });
  }

  if (error instanceof ZodError) {
    const errorIssues = error.format();

    return response
      .status(400)
      .send({ error: "validations error", issues: errorIssues });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return response.status(500).send({ error: error.message });
};
