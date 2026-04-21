import { FastifyInstance } from "fastify";
import { StudentController } from "../../controllers/student.controller";
import { validateCreateMember } from "../../middlewares/validation.middleware";
import { MemberService } from "../../services/student.service";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncWrapper } from "../../middlewares/async_wrapper.middleware";

export async function studentRoutes(fastify: FastifyInstance) {
  const controller = new StudentController(new MemberService());

  fastify.post(
    "/",
    { preHandler: [authMiddleware, validateCreateMember] },
    asyncWrapper(controller.create.bind(controller)),
  );
  fastify.get(
    "/:studentId",
    { preHandler: [authMiddleware] },
    asyncWrapper(controller.getById.bind(controller)),
  );
}
