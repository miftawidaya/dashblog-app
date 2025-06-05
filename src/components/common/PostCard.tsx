// src/components/PostCard.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MessageCircle, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

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
}) => {
  return (
    <Card className='mb-4 w-full transition'>
      <Link to={`/posts/${id}`}>
        <CardContent className='flex cursor-pointer gap-4 p-4'>
          {!compact && thumbnail && (
            <div className='relative aspect-[340/258] w-full overflow-hidden rounded-xl'>
              <img
                src={'/assets/post-thumbnail.jpg'}
                alt={'post-thumbnail'}
                className='absolute top-0 left-0 h-full w-full object-cover'
              />
              <img
                src={thumbnail}
                alt={title}
                className='absolute top-0 left-0 h-full w-full object-cover'
              />
            </div>
          )}
          <div className='flex flex-1 flex-col justify-between'>
            <div>
              <h3 className='text-foreground text-base font-semibold hover:underline'>
                {title}
              </h3>
              {!compact && tags.length > 0 && (
                <div className='text-muted-foreground mb-1 text-xs'>
                  {tags.map((tag, i) => (
                    <span key={i} className='mr-1'>
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              <p className='text-muted-foreground line-clamp-2 text-sm'>
                {summary}
              </p>
            </div>

            <div className='text-muted-foreground mt-3 flex items-center justify-between text-xs'>
              <div className='flex items-center gap-2'>
                <Avatar className='h-5 w-5'>
                  <AvatarImage src={author.avatar} alt={author.name} />
                  <AvatarFallback>{author.name[0]}</AvatarFallback>
                </Avatar>
                <span>
                  {author.name} • {date}
                </span>
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex items-center gap-1'>
                  <ThumbsUp className='h-4 w-4' />
                  <span>{likes}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <MessageCircle className='h-4 w-4' />
                  <span>{comments}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};
