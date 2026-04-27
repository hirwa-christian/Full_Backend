import { FastifyInstance } from "fastify";
import { UserController } from "../../controllers/user.controller";
import { UserService } from "../../services/user.service";

export async function userRoutes(fastify: FastifyInstance) {
  const userService = new UserService();
  const userController = new UserController(userService);

  fastify.post("/signup", userController.create.bind(userController));
  fastify.post("/login", userController.login.bind(userController));
}
