import { config } from "dotenv";
import { envMap } from "./constants";
import { RabbitMQExchange } from "../utils/rabbitmq";
import { ChannelModel } from "amqplib";
import { FakeRabbit } from "../interfaces/plugins.interface";
config();

interface DbEnv {
  connectionString: string;
}

interface RedisEnv {
  password: string;
  host: string;
  port: number;
}

interface RabbitEnv {
  protocol: string;
  hostname: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
}

const appEnv = process.env.APP_ENV?.toLowerCase() || "development";
export const envPrefix = envMap[appEnv] || "DEV";

const createDbConfig = (envPrefix: string, typePrefix: string): DbEnv => {
  const dialect = process.env[`DB_DIALECT`] || "postgresql";
  const host = process.env[`DB_HOST`] || "";
  const port = process.env[`DB_PORT`] || "3306";
  const user = process.env[`DB_USER`] || "";
  const password = process.env[`DB_PASS`] || "";
  const database = process.env[`DB_NAME`] || "";
  const connectionString = `${dialect}://${user}:${password}@${host}:${port}/${database}`;
  process.env.DATABASE_URL = connectionString;
  return { connectionString };
};
console.log("Database connection string set to:", process.env.DATABASE_URL);

const createRedisConfig = (envPrefix: string, redisType: "READ" | "WRITE"): RedisEnv => {
  const password = process.env[`${envPrefix}_${redisType}_REDIS_PASSWORD`] ?? "";
  const host = process.env[`${envPrefix}_${redisType}_REDIS_HOST`] ?? "";
  const port = parseInt(process.env[`${envPrefix}_${redisType}_REDIS_PORT`] ?? "6379", 10);
  return { password, host, port };
};

const createRabbitConfig = (envPrefix: string): RabbitEnv => {
  const protocol = process.env[`${envPrefix}_RABBIT_PROTOCOL`] ?? "amqp";
  const hostname = process.env[`${envPrefix}_RABBIT_SERVER`] ?? "localhost";
  const port = parseInt(process.env[`${envPrefix}_RABBIT_PORT`] ?? "5672", 10);
  const username = process.env[`${envPrefix}_RABBIT_USERNAME`] ?? "guest";
  const password = process.env[`${envPrefix}_RABBIT_PASSWORD`] ?? "guest";
  const vhost = process.env[`${envPrefix}_RABBIT_VHOST`] ?? "/";

  return { protocol, hostname, port, username, password, vhost };
};

export const dbConfig = {
  writeDBConnString: createDbConfig(envPrefix, "READ").connectionString,
  readDBConnString: createDbConfig(envPrefix, "WRITE").connectionString,
};

export const redisOptions = {
  redisWrite: createRedisConfig(envPrefix, "WRITE"),
  redisRead: createRedisConfig(envPrefix, "READ"),
};

export const rabbitConnOptions = createRabbitConfig(envPrefix);

export const fakeRabbitOptions: FakeRabbit = {
  connection: RabbitMQExchange,
  getConnection: async () => ({}) as ChannelModel,
  messageConsumer: async (
    queueName: string,
    handler: Function,
    routingKey: string,
    exchangeName: string,
    options?: any,
  ) => "" as unknown as string,
  messagePublisher: async (
    exchangeName: string,
    options?: { durable?: boolean; persistent?: boolean },
    exchangeType?: string,
  ) => {
    return (
      _routingKey: string,
      _msg: any,
      _publishingOptions?: { persistent: boolean; mandatory: boolean },
    ) => true;
  },
  setupQueueBinding: async () => {},
  shutdown: async () => {},
};
