export interface NotificationDto {
  clicked: boolean;
  createdAt: Date;
  description: string;
  notificationType: string;
  ownerId: string;
  senderId: string;
  senderName: string;
  id?: string;
}
