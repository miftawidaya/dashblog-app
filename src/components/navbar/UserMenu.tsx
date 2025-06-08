import { Link, useNavigate } from 'react-router-dom';
import { PencilLine, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import { Separator } from '@/components/ui/separator';
import { API_BASE_URL } from '@/utils/apis/axios-with-config';
import { useAuthContext } from '@/utils/contexts/AuthContext';

export default function UserMenu() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const avatarImage = `${API_BASE_URL}${user?.avatarUrl}`;
  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <>
      <Link
        to='/dashboard/write'
        className='text-primary-300 flex items-center gap-2 font-semibold underline underline-offset-3'
      >
        <PencilLine className='h-6 w-6' />
        Write Post
      </Link>
      <Separator orientation='vertical' className='h-6 bg-neutral-300' />
      <DropdownMenu>
        <DropdownMenuTrigger className='flex cursor-pointer items-center gap-3 font-medium'>
          <Avatar className='flex-center h-10 w-10 overflow-hidden rounded-full bg-neutral-200'>
            <AvatarImage
              src={avatarImage}
              alt={user?.name || 'User'}
              className='h-full w-full object-cover'
            />
            <AvatarFallback>{user?.name[0]}</AvatarFallback>
          </Avatar>
          <span className='text-sm font-semibold'>
            {user?.name || 'User'}
          </span>
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
  );
}
