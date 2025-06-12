// src/utils/apis/post.ts
import axiosWithConfig from './axios-with-config';
import type {
  Post,
  PaginatedPostResponse,
  Comment,
  LikeUser,
} from '@/utils/types/post';

export const fetchRecommendedPosts = async (
  page = 1,
  limit = 5
): Promise<PaginatedPostResponse> => {
  const res = await axiosWithConfig.get(
    `/posts/recommended?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const fetchMostLikedPosts = async (): Promise<PaginatedPostResponse> => {
  const res = await axiosWithConfig.get('/posts/most-liked');
  return res.data;
};

export const searchPosts = async (
  query: string
): Promise<PaginatedPostResponse> => {
  const res = await axiosWithConfig.get(
    `/posts/search?q=${encodeURIComponent(query)}`
  );
  return res.data;
};

export const fetchPostById = async (id: number): Promise<Post> => {
  const res = await axiosWithConfig.get(`/posts/${id}`);
  return res.data;
};

export const createPost = async (formData: FormData): Promise<Post> => {
  const res = await axiosWithConfig.post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};

export const updatePost = async (
  id: number,
  data: Partial<Post>
): Promise<Post> => {
  const res = await axiosWithConfig.patch(`/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id: number): Promise<{ success: boolean }> => {
  const res = await axiosWithConfig.delete(`/posts/${id}`);
  return res.data;
};

export const likePost = async (id: number): Promise<Post> => {
  const res = await axiosWithConfig.post(`/posts/${id}/like`);
  return res.data;
};

export const fetchLikes = async (id: number): Promise<LikeUser> => {
  const res = await axiosWithConfig.get(`/posts/${id}/likes`);
  return res.data;
};

export const fetchComments = async (id: number): Promise<Comment[]> => {
  const res = await axiosWithConfig.get(`/posts/${id}/comments`);
  return res.data;
};
