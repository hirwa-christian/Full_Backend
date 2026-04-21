import { FastifyInstance } from "fastify";
import { v1Routes } from "./v1";

export async function routes(fastify: FastifyInstance) {
  fastify.register(v1Routes, { prefix: "/api/v1" });
}
