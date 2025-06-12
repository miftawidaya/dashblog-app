// src/utils/types/comment.ts
import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  createdAt: z.string(),
  author: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    avatarUrl: z.string().optional(),
  }),
});

export type Comment = z.infer<typeof CommentSchema>;
