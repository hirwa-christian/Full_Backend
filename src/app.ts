import { FastifyPluginAsync } from "fastify";
import { routes } from "./routes";
import corsPlugin from "./plugins/cors";
import swaggerPlugin from "./plugins/swagger";
import attachSchema from "./plugins/attachSchema";
import i18nPlugin from "./plugins/i18n";
import rabbitPlugin from "./plugins/rabbitPlugin";
import redisPlugin from "./plugins/redis";

export const app: FastifyPluginAsync = async (fastify) => {
  await fastify.register(corsPlugin); // <-- Register CORS first
  await fastify.register(attachSchema);
  await fastify.register(swaggerPlugin);
  await fastify.register(i18nPlugin);
  await fastify.register(rabbitPlugin);
  await fastify.register(redisPlugin);
  await fastify.register(routes);
};
