// src/__tests__/user-api.test.ts
import { describe, it, expect, vi } from 'vitest';
import axiosWithConfig from '@/utils/apis/axios-with-config';
import {
  getUserByEmail,
  updateUserProfile,
  changeUserPassword,
} from '@/utils/apis/user';

vi.mock('@/utils/apis/axios-with-config');

describe('User API', () => {
  it('should get user by email', async () => {
    const mockUser = {
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
    };
    (axiosWithConfig.get as any).mockResolvedValueOnce({ data: mockUser });

    const data = await getUserByEmail('jane@example.com');
    expect(data).toEqual(mockUser);
  });

  it('should update user profile', async () => {
    const mockUpdatedUser = {
      name: 'Jane Updated',
      headline: 'Senior Dev',
    };
    (axiosWithConfig.patch as any).mockResolvedValueOnce({
      data: mockUpdatedUser,
    });

    const data = await updateUserProfile({
      name: 'Jane Updated',
      headline: 'Senior Dev',
      avatar: null,
    });
    expect(data).toEqual(mockUpdatedUser);
  });

  it('should change user password', async () => {
    const mockResponse = { message: 'Password updated successfully' };
    (axiosWithConfig.patch as any).mockResolvedValueOnce({
      data: mockResponse,
    });

    const data = await changeUserPassword({
      currentPassword: 'oldpass',
      newPassword: 'newpass123',
      confirmPassword: 'newpass123',
    });

    expect(data).toEqual(mockResponse);
  });
});
