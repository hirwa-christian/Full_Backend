import { FastifyInstance } from "fastify";
import { studentRoutes } from "./student.routes";
import { ClassRoutes } from "./class.routes";
import { userRoutes } from "./user.routes";

export async function v1Routes(fastify: FastifyInstance) {
  fastify.register(studentRoutes, { prefix: "/students" });
  fastify.register(ClassRoutes, { prefix: "/classes" });
  fastify.register(userRoutes, { prefix: "/users" });
}
