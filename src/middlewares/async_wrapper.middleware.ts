import { FastifyReply, FastifyRequest } from "fastify";

export function asyncWrapper(fn: (request: FastifyRequest, reply: FastifyReply) => Promise<any>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      return await fn(request, reply);
    } catch (err) {
      reply.send(err);
    }
  };
}
