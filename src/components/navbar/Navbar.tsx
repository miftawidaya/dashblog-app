// src/components/navbar/Navbar.tsx

import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Menu } from 'lucide-react';
import { useAuthContext } from '@/utils/contexts/AuthContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import UserMenu from './UserMenu';
import PublicMenu from './PublicMenu';
import AppLogo from '@/assets/app-logo.svg';

export default function MainNavbar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthContext();
  const handleLogout = () => {
    logout();
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

        {/* Mobile Menu Button */}
        <div className='lg:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-64 pt-10'
              aria-describedby={undefined}
            >
              {isAuthenticated ? (
                <div className='mt-4 flex flex-col gap-4'>
                  <Link to='/dashboard/write'>Write</Link>
                  <Link to='/profile'>Profile</Link>
                  <Button variant='ghost' onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  <Link to='/auth/login'>Login</Link>
                  <Link to='/auth/register'>
                    <Button>Register</Button>
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop User Menu */}
        <div className='hidden items-center gap-6 lg:flex lg:min-w-75'>
          {isAuthenticated ? <UserMenu /> : <PublicMenu />}
        </div>
      </nav>
    </header>
  );
}
