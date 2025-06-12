// src/types/post.ts

import z from 'zod';

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

export const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  tags: z.string().optional(),
  image: z
    .any()
    .refine((file) => !file || file instanceof File, 'Invalid image')
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      'Max image size is 5MB'
    )
    .refine(
      (file) => !file || ['image/jpeg', 'image/png'].includes(file.type),
      'Only PNG or JPG allowed'
    ),
});
