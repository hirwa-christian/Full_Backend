import { FastifyInstance } from "fastify";
import { ClassController } from "../../controllers/class.controller";
import { ClassService } from "../../services/class.service";

export async function ClassRoutes(fastify: FastifyInstance) {
  const classService = new ClassService();
  const classController = new ClassController(classService);

  fastify.post("/", classController.create.bind(classController));
  fastify.get("/", classController.getAll.bind(classController));
}
