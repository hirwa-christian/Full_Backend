import { server } from "../..";
import { INotificationsService } from "../../interfaces/notifications";
import { NotificationBody } from "../../interfaces/shared";

export class NotificationsService implements INotificationsService {
  async send(notification: NotificationBody) {
    const msgid = Math.floor(10000000000 + Math.random() * 99999999999);
    const pubNotif = await server.rabbit.messagePublisher("notifications_exchange");
    const fullmsg = {
      ...notification,
      member_id: Number(notification.member_id),
      msg_id: msgid,
    } as any;

    await pubNotif("send-message", fullmsg);
  }
}
