import type { RouteObject } from 'react-router-dom';

import AppLayout from '@/components/layout/AppLayout';
import AuthLayout from '@/components/layout/AuthLayout';
import DashboardLayout from '@/components/layout/DashboardLayout';

import Home from '@/pages/Home';
import Login from '@/pages/auth/LoginPage';
import Register from '@/pages/auth/RegisterPage';
import NotFound from '@/pages/NotFound';
import PostDetailPage from '@/pages/PostDetailPage';

import ProtectedRoute from '@/components/routes/ProtectedRoute';
import WritePost from '@/pages/dashboard/WritePost';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'posts/:id', element: <PostDetailPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { path: 'write', element: <WritePost /> },
          { path: 'edit/:id', element: <NotFound /> },
          { path: 'profile', element: <NotFound /> },
        ],
      },
    ],
  },
];
