import { FastifyRequest, FastifyReply } from "fastify";
import { ResponseHandler } from "../utils/response";
import { logger } from "../utils/logger";

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
  const token = request.headers["authorization"]?.split(" ")[1];
  //We are only checking if there is a token but in real scenario you should even verify the passed token
  if (!token) {
    logger.error("Unauthorized");
    ResponseHandler.error(reply, 101, { message: "Unauthorized" }, 401);
    return;
  }
  return token;
}
