import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar';
import React from 'react';

interface PostAuthorProps {
  name: string;
  avatar: string;
  date: string;
}

const PostAuthor: React.FC<PostAuthorProps> = ({ name, avatar, date }) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = dateObj.toLocaleString('en-US', { month: 'short' });
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div className='flex items-center gap-3 text-xs text-neutral-600 md:text-sm'>
      <span className='flex-center items-center gap-2'>
        <Avatar className='flex-center h-7.5 w-7.5 overflow-hidden rounded-full bg-neutral-200 md:h-10 md:w-10'>
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <span className='font-medium text-neutral-900'>{name}</span>
      </span>
      <span className='text-neutral-400'>•</span>
      <span className='text-neutral-600'>{formatDate(date)}</span>
    </div>
  );
};

export default PostAuthor;
