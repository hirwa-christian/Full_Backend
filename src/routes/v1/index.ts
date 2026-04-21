import { FastifyInstance } from "fastify";
import { studentRoutes } from "./student.routes";

export async function v1Routes(fastify: FastifyInstance) {
  fastify.register(studentRoutes, { prefix: "/students" });
}
