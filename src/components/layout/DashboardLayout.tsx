// src/components/layout/AppLayout.tsx
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../navbar/DashboardNavbar';
import Footer from './Footer';

export default function DashboardLayout() {
  return (
    <div className='flex min-h-screen flex-col pt-15 md:pt-20'>
      <DashboardNavbar />

      <main className='custom-container mx-auto flex-grow py-12'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
