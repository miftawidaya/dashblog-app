import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/utils/hooks/useUser';

export default function DashboardNavbar() {
  const { data: user } = useUser('hello@mail.com');
  const { pathname } = useLocation();

  const pageTitle = pathname.includes('edit') ? 'Edit Post' : 'Write Post';

  return (
    <header className='w-full border-b bg-white px-4 py-2 md:px-8'>
      <div className='flex items-center justify-between'>
        {/* Kiri */}
        <div className='flex items-center gap-2'>
          <Link
            to='/'
            className='text-muted-foreground flex items-center gap-1 text-sm hover:text-black'
          >
            <ArrowLeft className='h-4 w-4' />
            Back
          </Link>
          <span className='text-base font-semibold'>{pageTitle}</span>
        </div>

        {/* Kanan */}
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className='flex items-center gap-2 text-sm font-medium'>
              <img
                src={user.avatarUrl || '/default-avatar.png'}
                alt='avatar'
                className='h-6 w-6 rounded-full object-cover'
              />
              {user.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent align='center'>
              <DropdownMenuItem asChild>
                <Link to='/profile'>
                  <User className='mr-2 h-5 w-5' /> Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LogOut className='mr-2 h-5 w-5' />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
