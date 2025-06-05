// src/utils/hooks/useUser.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUserByEmail,
  updateUserProfile,
  changeUserPassword,
} from '@/utils/apis/user';

export const useUser = (email: string) => {
  return useQuery({
    queryKey: ['user', email],
    queryFn: () => getUserByEmail(email),
    enabled: !!email, // jangan fetch kalau email kosong
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', data.email] });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changeUserPassword,
  });
};
