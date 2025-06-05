// src/components/navbar/MainNavbar.tsx

import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, PencilLine, LogOut, User } from 'lucide-react';

import AppLogo from '@/assets/app-logo.svg';
import { useAuthContext } from '@/utils/contexts/AuthContext';

export default function MainNavbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthContext();

  const handleLogout = () => {
    logout(); // logout dari context
    navigate('/auth/login');
  };

  return (
    <header className='fixed top-0 z-50 w-full border-b border-neutral-300 bg-white'>
      <nav className='custom-container flex-between h-15 w-full md:h-20'>
        {/* Logo */}
        <Link to='/' className='text-xl font-bold'>
          <AppLogo />
        </Link>

        {/* Search */}
        <div className='hidden flex-1 justify-center lg:flex'>
          <div className='relative w-full max-w-93'>
            <Search className='absolute top-1/2 left-4 h-6 w-6 -translate-y-1/2 text-neutral-500' />
            <Input
              placeholder='Search'
              className='w-full pl-12 text-sm placeholder:text-neutral-500'
            />
          </div>
        </div>

        {/* User Actions */}
        <div className='flex items-center gap-6 text-sm'>
          {isAuthenticated ? (
            <>
              <Link
                to='/dashboard/write'
                className='text-primary-300 flex items-center gap-2 font-semibold underline underline-offset-3'
              >
                <PencilLine className='h-6 w-6' />
                Write Post
              </Link>
              <div className='h-6 bg-neutral-300'>
                <Separator orientation='vertical' />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger className='flex cursor-pointer items-center gap-3 font-medium'>
                  <div className='flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-neutral-700'>
                    <img
                      src={user?.avatarUrl || '/assets/avatar.jpg'}
                      alt='avatar'
                      className='h-full w-full object-cover'
                    />
                  </div>
                  <span className='text-sm font-semibold'>{user?.name || 'User'}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem asChild>
                    <Link to='/profile'>
                      <User className='mr-2 h-4 w-4' /> Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className='mr-2 h-4 w-4' />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link
                to='/auth/login'
                className='text-primary-300 hover:text-primary-300/80 font-semibold underline underline-offset-4'
              >
                Login
              </Link>
              <div className='h-6 bg-neutral-300'>
                <Separator orientation='vertical' />
              </div>
              <Button variant='default' className='h-11 w-45.5' asChild>
                <Link to='/auth/register'>Register</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
