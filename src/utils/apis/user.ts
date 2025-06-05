// src/utils/apis/user.ts
import axiosWithConfig from './axios-with-config';

// Get user by email
export const getUserByEmail = async (email: string) => {
  const res = await axiosWithConfig.get(`/users/${encodeURIComponent(email)}`);
  return res.data;
};

// Update profile (multipart/form-data)
export const updateUserProfile = async (data: {
  name: string;
  headline?: string;
  avatar?: File | null;
}) => {
  const formData = new FormData();
  formData.append('name', data.name);
  if (data.headline) formData.append('headline', data.headline);
  if (data.avatar) formData.append('avatar', data.avatar);

  const res = await axiosWithConfig.patch('/users/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return res.data;
};

// Change password
export const changeUserPassword = async (payload: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const res = await axiosWithConfig.patch('/users/password', payload);
  return res.data;
};
