import { FastifyRequest, FastifyReply } from "fastify";
import { createMemberSchema } from "../validations/member.schema";
import { ResponseHandler } from "../utils/response";
import { logger } from "../utils/logger";

export async function validateCreateMember(request: FastifyRequest, reply: FastifyReply) {
  try {
    await createMemberSchema.validateAsync(request.body, { abortEarly: false });
  } catch (err: any) {
    logger.error(err);
    return ResponseHandler.error(
      reply,
      101,
      { message: err.details?.map((d: any) => d.message).join(", ") || err.message },
      400,
    );
  }
}
