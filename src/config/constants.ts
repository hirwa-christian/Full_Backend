import { config } from "dotenv";
import { cleanEnv, str, port, host, num } from "envalid";
import { envPrefix } from "./config";
config({ quiet: true });

const env = cleanEnv(process.env, {
  APP_ENV: str({
    choices: ["development", "qa", "uat", "production", "test"],
    default: "development",
  }),
  APP_PORT: port({ default: 3001 }),
  APP_HOST: host({ default: "0.0.0.0" }),
  LOG_LEVEL: str({ default: "info" }),
  ...(envPrefix == "PDN"
    ? {
        //Database connection variables
        PDN_READ_DB_DIALECT: str(),
        PDN_READ_DB_HOST: str(),
        PDN_READ_DB_PORT: num(),
        PDN_READ_DB_USER: str(),
        PDN_READ_DB_PASS: str(),
        PDN_READ_DB_NAME: str(),
        PDN_WRITE_DB_DIALECT: str(),
        PDN_WRITE_DB_HOST: str(),
        PDN_WRITE_DB_PORT: num(),
        PDN_WRITE_DB_USER: str(),
        PDN_WRITE_DB_PASS: str(),
        PDN_WRITE_DB_NAME: str(),

        //RabbitMQ connection variables
        PDN_RABBIT_PROTOCOL: str({ default: "amqp" }),
        PDN_RABBIT_SERVER: str({ default: "localhost" }),
        PDN_RABBIT_PORT: num({ default: Number.parseInt("5672", 10) }),
        PDN_RABBIT_USERNAME: str({ default: "guest" }),
        PDN_RABBIT_PASSWORD: str({ default: "guest" }),
        PDN_RABBIT_VHOST: str({ default: "/" }),

        //Redis connection variables
        PDN_WRITE_REDIS_PASSWORD: str(),
        PDN_WRITE_REDIS_HOST: str(),
        PDN_WRITE_REDIS_PORT: num({ default: Number.parseInt("63779", 10) }),
        PDN_READ_REDIS_PASSWORD: str(),
        PDN_READ_REDIS_HOST: str(),
        PDN_READ_REDIS_PORT: num({ default: Number.parseInt("63779", 10) }),
      }
    : envPrefix == "UAT"
      ? {
          //Database connection variables
          UAT_READ_DB_DIALECT: str(),
          UAT_READ_DB_HOST: str(),
          UAT_READ_DB_PORT: num(),
          UAT_READ_DB_USER: str(),
          UAT_READ_DB_PASS: str(),
          UAT_READ_DB_NAME: str(),
          UAT_WRITE_DB_DIALECT: str(),
          UAT_WRITE_DB_HOST: str(),
          UAT_WRITE_DB_PORT: num(),
          UAT_WRITE_DB_USER: str(),
          UAT_WRITE_DB_PASS: str(),
          UAT_WRITE_DB_NAME: str(),

          //RabbitMQ connection variables
          UAT_RABBIT_PROTOCOL: str({ default: "amqp" }),
          UAT_RABBIT_SERVER: str({ default: "localhost" }),
          UAT_RABBIT_PORT: num({ default: Number.parseInt("5672", 10) }),
          UAT_RABBIT_USERNAME: str({ default: "guest" }),
          UAT_RABBIT_PASSWORD: str({ default: "guest" }),
          UAT_RABBIT_VHOST: str({ default: "/" }),

          //Redis connection variables
          UAT_WRITE_REDIS_PASSWORD: str(),
          UAT_WRITE_REDIS_HOST: str(),
          UAT_WRITE_REDIS_PORT: num({ default: Number.parseInt("63779", 10) }),
          UAT_READ_REDIS_PASSWORD: str(),
          UAT_READ_REDIS_HOST: str(),
          UAT_READ_REDIS_PORT: num({ default: Number.parseInt("63779", 10) }),
        }
      : envPrefix == "DEV"
        ? {
            //Database connection variables
            DEV_READ_DB_DIALECT: str(),
            DEV_READ_DB_HOST: str(),
            DEV_READ_DB_PORT: num(),
            DEV_READ_DB_USER: str(),
            DEV_READ_DB_PASS: str(),
            DEV_READ_DB_NAME: str(),
            DEV_WRITE_DB_DIALECT: str(),
            DEV_WRITE_DB_HOST: str(),
            DEV_WRITE_DB_PORT: num(),
            DEV_WRITE_DB_USER: str(),
            DEV_WRITE_DB_PASS: str(),
            DEV_WRITE_DB_NAME: str(),

            //RabbitMQ connection variables
            DEV_RABBIT_PROTOCOL: str({ default: "amqp" }),
            DEV_RABBIT_SERVER: str({ default: "localhost" }),
            DEV_RABBIT_PORT: num({ default: Number.parseInt("5672", 10) }),
            DEV_RABBIT_USERNAME: str({ default: "guest" }),
            DEV_RABBIT_PASSWORD: str({ default: "guest" }),
            DEV_RABBIT_VHOST: str({ default: "/" }),

            //Redis connection variables
            DEV_WRITE_REDIS_PASSWORD: str(),
            DEV_WRITE_REDIS_HOST: str(),
            DEV_WRITE_REDIS_PORT: num({ default: Number.parseInt("63779", 10) }),
            DEV_READ_REDIS_PASSWORD: str(),
            DEV_READ_REDIS_HOST: str(),
            DEV_READ_REDIS_PORT: num({ default: Number.parseInt("63779", 10) }),
          }
        : {}),
});

// Export constants
export const APP_ENV = env.APP_ENV;
export const PORT = env.APP_PORT;
export const HOST = env.APP_HOST;
export const LOG_LEVEL = env.LOG_LEVEL;

export const envMap: Record<string, string> = {
  development: "DEV",
  uat: "UAT",
  production: "PDN",
  test: "TEST",
  qa: "QA",
};

//Any external API Call should be defined here
export const EXTERNAL_URLS = {};
