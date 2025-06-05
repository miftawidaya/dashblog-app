// src/components/layout/AuthLayout.tsx
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-6 space-y-6'>
      <div className='w-full max-w-90 rounded-lg border border-neutral-200 bg-white p-6 shadow-[0_0px_24px_rgba(205,204,204,0.16)] gap-5'>
        <Outlet />
      </div>
    </div>
  );
}
