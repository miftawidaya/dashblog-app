// src/utils/hooks/usePosts.ts
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import {
  fetchRecommendedPosts,
  fetchMostLikedPosts,
  searchPosts,
  fetchPostById,
} from '../apis/post';
import type { PaginatedPostResponse, Post } from '@/utils/types/post';

export const useRecommendedPosts = (
    page: number,
    limit: number = 5
  ): UseQueryResult<PaginatedPostResponse, Error> => {
    return useQuery({
    queryKey: ['recommendedPosts', page] as const,
    queryFn: () => fetchRecommendedPosts(page, limit),
    gcTime: 0,
  });
  };

export const useMostLikedPosts = () => {
  return useQuery({
    queryKey: ['mostLikedPosts'],
    queryFn: fetchMostLikedPosts,
  });
};

export const useSearchPosts = (query: string) => {
  return useQuery({
    queryKey: ['searchPosts', query],
    queryFn: () => searchPosts(query),
    enabled: !!query, // only run when query is not empty
  });
};

export const usePostDetail = (id: string | number) => {
  return useQuery<Post, Error>({
    queryKey: ['postDetail', id],
    queryFn: () => fetchPostById(Number(id)),
    enabled: !!id,
  });
};