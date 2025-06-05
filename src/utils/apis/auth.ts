// src/utils/apis/auth.ts
import type { AxiosResponse } from 'axios';
import axiosWithConfig from './axios-with-config';

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  email: string;
  password: string;
  name: string;
}

interface ApiErrorResponse {
  message: string;
}

export const Login = async (
  credentials: LoginCredentials
): Promise<AuthResponse | ApiErrorResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosWithConfig.post(
      '/auth/login',
      credentials
    );
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: ApiErrorResponse } };
    throw new Error(
      axiosError.response?.data?.message ||
        'Login failed, please check your email or password!'
    );
  }
};

export const Register = async (
  credentials: RegisterCredentials
): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await axiosWithConfig.post(
      '/auth/register',
      credentials
    );
    const { token } = response.data;
    localStorage.setItem('token', token);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as { response?: { data?: ApiErrorResponse } };
    throw new Error(
      axiosError.response?.data?.message ||
        'Register failed, please check your data!'
    );
  }
};
