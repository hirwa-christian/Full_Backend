import "fastify";
import { RabbitMQExchange } from "../utils/rabbitmq";
import type { Redis } from "ioredis";
import { TFunction } from "i18next";

declare module "fastify" {
  interface FastifyInstance {
    redisRead: Redis;
    redisWrite: Redis;
    rabbit: {
      connection: typeof RabbitMQExchange;
      getConnection: typeof RabbitMQExchange.getConnection;
      messageConsumer: typeof RabbitMQExchange.messageConsumer;
      messagePublisher: typeof RabbitMQExchange.messagePublisher;
      setupQueueBinding: typeof RabbitMQExchange.setupQueueBinding;
      shutdown: typeof RabbitMQExchange.shutdown;
    };
    t: TFunction;
  }
  interface FastifyRequest {
    t: TFunction;
  }
}
