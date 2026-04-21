import { Channel, Message } from "amqplib";
import { NotificationsService } from "../services/notification/notifications.service";
import { logFileData } from "../utils/logFileData";

const retryLimit = 3;
let resumeTimeout: NodeJS.Timeout | null = null;
const DLQ_NAME = "savings.deposit.dlq";

export const handleQueueRetry = (
  msg: Message,
  channel: Channel,
  err: any,
  currentRetry: number,
  headers: any,
  isPaused: boolean,
) => {
  const payloadStr = msg.content.toString();
  const payload = JSON.parse(payloadStr);
  const message = payload.msg;

  const msBody = {
    format: "sms",
    linked_msisdn: message.linked_msisdn,
    member_id: message.member_id,
    device_id: message.linked_msisdn,
    device_token: message.linked_msisdn,
    msg_code: 56,
    language: "kin",
  };

  const notificationService = new NotificationsService();
  if (err.name === "TooManyRequestsError" && err.retryAfter) {
    console.log(`Pausing consumer for ${err.retryAfter} seconds...`);
    isPaused = true;
    resumeTimeout = setTimeout(() => {
      isPaused = false;
      console.info("Consumer resumed.");
    }, err.retryAfter * 1000);
  }

  if (currentRetry < retryLimit) {
    const retryPayload = Buffer.from(payloadStr);

    try {
      channel.sendToQueue(msg.fields.routingKey, retryPayload, {
        headers: {
          ...headers,
          "x-retry-count": currentRetry + 1,
        },
        persistent: true,
        contentType: "application/json",
      });

      channel.ack(msg);

      logFileData("rabbitmq.log", `Requeued message (retry ${currentRetry + 1}): ${payloadStr}\n`);
    } catch (err) {
      console.log("Republish failed, NACKING original");
      notificationService.send(msBody);
      channel.nack(msg, false, true);
    }
  } else {
    // Retry limit exceeded
    try {
      channel.sendToQueue(DLQ_NAME, Buffer.from(payloadStr), {
        headers,
        persistent: true,
        contentType: "application/json",
      });

      channel.ack(msg);

      logFileData("rabbitmq.log", `Retry limit exceeded. Moved to DLQ: ${payloadStr}\n`);
    } catch (err) {
      notificationService.send(msBody);
      console.error("Failed to publish to DLQ, nacking original message", err);
      channel.nack(msg, false, true);
    }
  }
};
