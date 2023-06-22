interface createdAtObj {
  seconds: number;
  nanoseconds: number;
}

export interface PostDto {
  name: string;
  postPhoto: string;
  reactions: number;
  title: string;
  url: string;
  userId: string;
  id: string;
  createdAt: createdAtObj;
}
