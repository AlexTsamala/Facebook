interface createdAtObj {
  seconds: number;
  nanoseconds: number;
}

export interface MessengerDto {
  createdAt: createdAtObj;
  message: string;
  receiverId: string;
  senderId: string;
  profilePhoto: string;
  name: string;
  id: string;
}
