// src/components/layout/AppLayout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <div className='min-h-screen pt-15 md:pt-20'>
      <Navbar />

      <main className='custom-container flex min-h-[calc(100vh-10rem)] w-full flex-wrap items-center py-12'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
