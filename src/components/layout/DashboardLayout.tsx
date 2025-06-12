// src/components/layout/AppLayout.tsx
import { Outlet } from 'react-router-dom';
import DashboardNavbar from '../navbar/DashboardNavbar';
import Footer from './Footer';

export default function DashboardLayout() {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='fixed top-0 z-50 w-full border-b border-neutral-300 bg-white'>
        <DashboardNavbar />
      </header>

      <main className='custom-container mx-auto flex-grow p-4'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
