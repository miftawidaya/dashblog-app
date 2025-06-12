// utils/hooks/useComments.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '@/utils/apis/axios-with-config';
import type { Comment } from '@/utils/types/comment';

export const useComments = (postId: string) => {
  return useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: async () => {
      const res = await axios.get(`/comments/${postId}`);
      return res.data;
    },
  });
};

export const useAddComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => {
      const res = await axios.post(`/comments/${postId}`, { content });
      return res.data;
    },
    onMutate: async (newComment) => {
      queryClient.cancelQueries({ queryKey: ['comments', postId] });
      const prev = queryClient.getQueryData<Comment[]>(['comments', postId]);

      if (prev) {
        queryClient.setQueryData<Comment[]>(
          ['comments', postId],
          [
            ...prev,
            {
              id: Date.now(),
              content: newComment,
              createdAt: new Date().toISOString(),
              author: {
                id: 0,
                name: 'You',
                email: 'you@example.com',
                avatarUrl: '/default-avatar.png',
              },
            },
          ]
        );
      }

      return { prev };
    },
    onError: (_err, _new, context) => {
      queryClient.setQueryData<Comment[]>(['comments', postId], context?.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });
};
