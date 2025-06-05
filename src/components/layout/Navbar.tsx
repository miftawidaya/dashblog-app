import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PencilIcon } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('John Doe');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      // Optionally load user profile data here
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/auth/login');
  };

  return (
    <nav className='custom-container flex-between h-15 w-full md:h-20'>
      {/* Left: Logo */}
      <Link to='/' className='text-primary text-xl font-bold'>
        MyApp
      </Link>

      {/* Center: Search */}
      <div className='max-w-xl flex-1 px-4'>
        <Input placeholder='Search...' className='w-full' />
      </div>

      {/* Right: Auth / User Menu */}
      <div className='flex items-center gap-4'>
        {!isAuthenticated ? (
          <>
            <Link
              to='/auth/login'
              className='text-sm text-neutral-700 hover:underline'
            >
              Login
            </Link>
            <Button asChild>
              <Link to='/auth/register'>Register</Link>
            </Button>
          </>
        ) : (
          <>
            <Button
              variant='default'
              size='icon'
              onClick={() => navigate('/write')}
            >
              <PencilIcon className='h-5 w-5' />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='default'
                  className='hover:bg-muted flex items-center gap-2 rounded-full px-3 py-1'
                >
                  <div className='bg-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold text-white'>
                    {userName.charAt(0)}
                  </div>
                  <span className='text-sm font-medium'>{userName}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </nav>
  );
}
