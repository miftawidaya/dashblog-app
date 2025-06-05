import { describe, it, expect } from 'vitest';
import { updateProfileSchema, changePasswordSchema } from '@/utils/types/user';

describe('updateProfileSchema', () => {
  it('should pass with valid data', () => {
    const result = updateProfileSchema.safeParse({
      name: 'John Doe',
      headline: 'Developer',
    });
    expect(result.success).toBe(true);
  });

  it('should fail if name is empty', () => {
    const result = updateProfileSchema.safeParse({
      name: '',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Name is required');
    }
  });
});

describe('changePasswordSchema', () => {
  it('should pass when all fields are valid', () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: '123456',
      newPassword: 'abcdef',
      confirmPassword: 'abcdef',
    });
    expect(result.success).toBe(true);
  });

  it('should fail when passwords do not match', () => {
    const result = changePasswordSchema.safeParse({
      currentPassword: '123456',
      newPassword: 'abcdef',
      confirmPassword: 'wrongpass',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Passwords do not match');
    }
  });
});
