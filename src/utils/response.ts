import { FastifyReply } from "fastify";
import { serializeBigInt } from "./serialize";

export class ResponseHandler {
  static success(
    reply: FastifyReply,
    resp_code: number = 100,
    message = "Success",
    data: any = null,
    statusCode: number = 200,
  ) {
    return reply.status(statusCode).send({
      success: true,
      resp_msg: message,
      resp_code,
      data: serializeBigInt(data),
    });
  }

  static error(reply: FastifyReply, resp_code: number = 101, error: any, statusCode = 400) {
    return reply.status(statusCode).send({
      success: false,
      resp_msg:
        error?.message ||
        error ||
        "We couldn't process this request, Please contact gwiza customer support for assistance.",
      resp_code,
      errors: error?.details || null,
      data: error?.emptyData ?? null,
    });
  }
}
