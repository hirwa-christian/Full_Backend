import fp from "fastify-plugin";
import { redisOptions } from "../config/config";

import Redis from "ioredis";
import { logger } from "../utils/logger";

export default fp(async (fastify) => {
  if (process.env.NODE_ENV === "test") {
    const createFakeRedis = () =>
      ({
        get: jest.fn().mockResolvedValue(null),
        set: jest.fn().mockResolvedValue("OK"),
        setex: jest.fn().mockResolvedValue("OK"),
        del: jest.fn().mockResolvedValue(1),
        quit: jest.fn().mockResolvedValue("OK"),
        disconnect: jest.fn(),
        on: jest.fn(),
      }) as any;

    const redisRead = createFakeRedis();
    const redisWrite = createFakeRedis();

    fastify.decorate("redisRead", redisRead);
    fastify.decorate("redisWrite", redisWrite);

    fastify.addHook("onClose", async () => {
      await redisRead.quit();
      await redisWrite.quit();
    });

    return;
  }

  const redisRead = new Redis(redisOptions.redisRead);
  const redisWrite = new Redis(redisOptions.redisWrite);

  fastify.decorate("redisRead", redisRead);
  fastify.decorate("redisWrite", redisWrite);

  redisRead.on("ready", () => logger.info("Redis READ connected"));
  redisWrite.on("ready", () => logger.info("Redis WRITE connected"));

  redisRead.on("error", (err) => logger.info("Redis READ error", err));
  redisWrite.on("error", (err) => logger.info("Redis WRITE error", err));

  fastify.addHook("onClose", async () => {
    await redisRead.quit();
    await redisWrite.quit();
  });
});
