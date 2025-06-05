// src/components/layout/AppLayout.tsx
import { Outlet } from 'react-router-dom';
import MainNavbar from '../navbar/MainNavbar';
import Footer from './Footer';

export default function AppLayout() {
  return (
    <div className='pt-15 md:pt-20 min-h-screen'>

      <MainNavbar />

      <main className='custom-container min-h-[calc(100vh-10rem)] py-12 flex flex-wrap items-center w-full'>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
