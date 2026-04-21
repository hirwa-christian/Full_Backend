export interface NotificationBody {
  format: string;
  linked_msisdn: string;
  subject?: string;
  member_id: number;
  device_id?: string | number | null;
  device_token?: string | null;
  msg_code: number;
  language: string;
  msg_id?: number;
  message_data?: Record<string, any>;
}
