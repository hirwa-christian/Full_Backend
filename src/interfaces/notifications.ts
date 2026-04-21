import { NotificationBody } from "./shared";

export interface INotificationsService {
  send(notification: NotificationBody): Promise<void>;
}
