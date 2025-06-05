// src/routes/index.tsx
import type { RouteObject } from 'react-router-dom';

import AppLayout from '@/components/layout/AppLayout';
import AuthLayout from '@/components/layout/AuthLayout';

import Home from '@/pages/Home';
import Login from '@/pages/auth/LoginPage';
import Register from '@/pages/auth/RegisterPage';
import NotFound from '@/pages/NotFound';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PostDetailPage from '@/pages/PostDetailPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'posts/:id',
        element: <PostDetailPage />,
      },
      {
        path: 'post/write',
        element: <NotFound />,
      },
      {
        path: 'post/edit/:id',
        element: <NotFound />,
      },
      {
        path: 'profile',
        element: <NotFound />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/posts',
    element: <DashboardLayout />,
    children: [
      {
        path: 'write',
        element: <NotFound />,
      },
      {
        path: 'edit/:id',
        element: <NotFound />,
      }
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
];
