interface createdAtObj {
  seconds: number;
  nanoseconds: number;
}

export interface NotificationDto {
  clicked: boolean;
  createdAt: createdAtObj;
  description: string;
  notificationType: string;
  ownerId: string;
  senderId: string;
  senderName: string;
  profilePhoto: string;
  id?: string;
}
