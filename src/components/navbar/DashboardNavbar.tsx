import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import UserMenu from './UserMenu';

export default function DashboardNavbar() {
  const { pathname } = useLocation();

  const pageTitle = pathname.includes('edit') ? 'Edit Post' : 'Write Post';

  return (
    <header className='fixed top-0 z-50 w-full border-b border-neutral-300 bg-white'>
      <nav className='custom-container flex-between h-15 w-full md:h-20'>
        <div className='flex items-center gap-2'>
          <Link
            to='/'
            className='text-md flex items-center gap-1 font-bold text-neutral-950 hover:text-neutral-950/80'
          >
            <ArrowLeft stroke='currentColor' className='h-6 w-6' />
          </Link>
          <span className='text-base font-semibold'>{pageTitle}</span>
        </div>

        <UserMenu compact />
      </nav>
    </header>
  );
}
