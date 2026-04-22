import { FastifyInstance } from "fastify";
import { StudentController } from "../../controllers/student.controller";
import { validateCreateMember } from "../../middlewares/validation.middleware";
import { StudentService } from "../../services/student.service";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { asyncWrapper } from "../../middlewares/async_wrapper.middleware";
import { Container } from "winston";

export async function studentRoutes(fastify: FastifyInstance) {
  const controller = new StudentController(new StudentService());

  fastify.post(
    "/",
    // { preHandler: [authMiddleware, validateCreateMember] },
    asyncWrapper(controller.create.bind(controller)),
  );
  fastify.get("/", asyncWrapper(controller.getAll.bind(controller)))
  fastify.get(
    "/:studentId",
    // { preHandler: [authMiddleware] },
    asyncWrapper(controller.getById.bind(controller)),
  );
  fastify.put("/:studentId", asyncWrapper(controller.update.bind(controller)))
}
