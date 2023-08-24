interface createdAtObj {
  seconds: number;
  nanoseconds: number;
}

export interface commentDto {
  comment: string;
  profilePhoto: string;
  name: string;
  createdAt: Date;
  id: string;
}

export interface PostDto {
  name: string;
  postPhoto: string;
  reactions: number;
  title: string;
  url: string;
  userId: string;
  id: string;
  comments: commentDto[];
  createdAt: createdAtObj;
}
