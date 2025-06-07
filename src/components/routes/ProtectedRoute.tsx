// src/components/routes/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/utils/hooks/useAuth';

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
