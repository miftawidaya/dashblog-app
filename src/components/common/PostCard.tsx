// src/components/PostCard.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import CommentIcon from '@/assets/icons/comment.svg';
import LikeIcon from '@/assets/icons/like.svg';

type PostCardProps = {
  id: number;
  thumbnail?: string;
  title: string;
  tags: string[];
  summary: string;
  author: {
    avatar: string;
    name: string;
  };
  date: string;
  likes: number;
  comments: number;
  compact?: boolean;
  className?: string;
};

export const PostCard: React.FC<PostCardProps> = ({
  id,
  thumbnail,
  title,
  tags,
  summary,
  author,
  date,
  likes,
  comments,
  compact = false,
  className,
}) => {
  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = dateObj.toLocaleString('en-US', { month: 'short' });
    const year = dateObj.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <Card className={cn('w-full transition', className)}>
      <Link to={`/posts/${id}`}>
        <CardContent className='flex cursor-pointer gap-4 md:gap-6'>
          {/* Thumbnail */}
          {!compact && thumbnail && (
            <div className='relative w-[340px] overflow-hidden rounded-xl bg-neutral-700'>
              <img
                src={thumbnail}
                alt={title}
                className='absolute top-0 left-0 h-full w-full object-cover'
              />
            </div>
          )}
          {/* Main Content */}
          <div className='flex flex-1 flex-col gap-2 md:gap-4'>
            {/* Content */}
            <div className='flex flex-col gap-2 md:gap-3'>
              {/* Title */}
              {!compact ? (
                <h3 className='text-foreground text-md font-semibold hover:underline md:text-xl'>
                  {title}
                </h3>
              ) : (
                <h3 className='text-foreground text-md line-clamp-2 font-bold hover:underline'>
                  {title}
                </h3>
              )}
              {/* Tags */}
              {!compact && tags.length > 0 && (
                <div className='flex flex-wrap gap-2 text-neutral-900'>
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className='flex-center h-7 rounded-md border border-neutral-300 px-2 text-xs'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              {/* Summary */}
              <p className='line-clamp-2 text-sm text-neutral-900'>{summary}</p>
            </div>

            {/* Author */}
            <div className='flex items-center gap-3 text-xs text-neutral-600 md:text-sm'>
              <span className='flex items-center gap-2'>
                <Avatar className='h-7.5 w-7.5 md:h-10 md:w-10'>
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name[0]}</AvatarFallback>
                </Avatar>
                <span className='font-medium text-neutral-900'>
                  {author.name}
                </span>
              </span>
              <span className='text-neutral-400'>•</span>
              <span className='text-neutral-600'>{formatDate(date)}</span>
            </div>

            {/* Interactions */}
            <div className='flex items-center gap-4 text-xs text-neutral-600 md:text-sm'>
              <div className='flex items-center gap-1.5 text-neutral-600'>
                <LikeIcon className='h-4 w-4 md:h-6 md:w-6' />
                <span>{likes}</span>
              </div>
              <div className='flex items-center gap-1.5'>
                <CommentIcon className='h-4 w-4 md:h-6 md:w-6' />
                <span>{comments}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
