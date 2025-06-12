// src/components/PostCard.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import PostInteractions from './PostInteractions';
import PostAuthor from './PostAuthor';
import PostTag from './PostTag';

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
  return (
    <Card className={cn('w-full transition', className)}>
      <Link to={`/posts/${id}`}>
        <CardContent className='flex cursor-pointer gap-4 md:gap-6'>
          {/* Thumbnail */}
          {!compact && thumbnail && (
            <div className='relative hidden w-[340px] overflow-hidden rounded-xl bg-neutral-700 lg:block'>
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
                    <PostTag key={i} tag={tag} />
                  ))}
                </div>
              )}
              {/* Summary */}
              <p className='line-clamp-2 text-sm text-neutral-900'>{summary}</p>
            </div>

            {/* Author */}
            <PostAuthor name={author.name} avatar={author.avatar} date={date} />

            {/* Interactions */}
            <PostInteractions likes={likes} comments={comments} />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
