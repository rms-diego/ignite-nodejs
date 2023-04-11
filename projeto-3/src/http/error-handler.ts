import { Exception } from "@/Exception";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const errorHandler = async (
  error: FastifyError,
  _request: FastifyRequest,
  response: FastifyReply
) => {
  if (error instanceof Exception) {
    return response.status(error.statusCode).send({ error: error.message });
  }

  return response.status(500).send({ error: error.message });
};
