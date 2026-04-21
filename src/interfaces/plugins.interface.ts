import { ChannelModel } from "amqplib";
import { RabbitMQExchange } from "../utils/rabbitmq";

export interface FakeRabbit {
  connection: typeof RabbitMQExchange;
  getConnection: () => Promise<ChannelModel>;
  messageConsumer: (
    queueName: string,
    handler: Function,
    routingKey: string,
    exchangeName: string,
    options?: any,
  ) => Promise<string>;
  messagePublisher: (
    exchangeName: string,
    options?: { durable?: boolean; persistent?: boolean },
    exchangeType?: string,
  ) => Promise<
    (
      routingKey: string,
      msg: any,
      publishingOptions?: { persistent: boolean; mandatory: boolean },
    ) => boolean
  >;
  setupQueueBinding: () => Promise<void>;
  shutdown: () => Promise<void>;
}
