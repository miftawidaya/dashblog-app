// src/types/post.ts

export interface Author {
  id: number;
  name: string;
  email: string;
}

export type Post = {
  id: number;
  title: string;
  content: string;
  tags: string[];
  imageUrl: string;
  author: {
    id: number;
    name: string;
    email: string;
    avatarUrl: string;
  };
  createdAt: string;
  likes: number;
  comments: number;
};

export type PaginatedPostResponse = {
  data: Post[];
  total: number;
  page: number;
  lastPage: number;
};

export interface LikeUser {
  id: number;
  name: string;
  headline: string;
  avatarUrl: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    headline: string;
    avatarUrl: string;
  };
}
