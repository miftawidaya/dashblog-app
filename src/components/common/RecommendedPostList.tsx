import React, { useState } from 'react';
import { PostCard } from '@/components/common/PostCard';
import { Button } from '@/components/ui/button';
import { useRecommendedPosts } from '@/utils/hooks/usePosts';
import { Skeleton } from '../ui/skeleton';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { API_BASE_URL } from '@/utils/apis/axios-with-config';
import { useAuthors } from '@/utils/hooks/useAuthors';

export const RecommendedPostList: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useRecommendedPosts(page, limit);
  const emails = data?.data.map((post) => post.author.email) || [];
  const { authors } = useAuthors(emails);

  const totalPages = data ? Math.ceil(data.total / limit) : 1;

  const goToPage = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  // if (isLoading) return <p className="text-muted-foreground">Loading posts...</p>;
  if (isError || !data)
    return <p className='text-red-500'>Failed to load posts.</p>;

  if (isLoading)
    return (
      <div className='flex w-full flex-col space-y-4'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='w-full space-y-2'>
            <Skeleton className='h-5 w-3/4' />
            <Skeleton className='h-4 w-full' />
            <div className='flex gap-2'>
              <Skeleton className='h-4 w-16' />
              <Skeleton className='h-4 w-16' />
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className='w-full'>
      <div className='flex flex-col space-y-8 pb-8'>
        {data.data.map((post) => {
          const avatarUrl = authors[post.author.email]?.avatarUrl;
          const avatar = avatarUrl ? `${API_BASE_URL}${avatarUrl}` : '';
          return (
            <PostCard
              className='md:border-b md:border-neutral-300 md:pb-8'
              key={post.id}
              id={post.id}
              thumbnail={post.imageUrl}
              title={post.title}
              tags={post.tags}
              summary={post.content.slice(0, 150)}
              author={{
                name: post.author.name,
                avatar: avatar,
              }}
              date={post.createdAt}
              likes={post.likes}
              comments={post.comments}
            />
          );
        })}
      </div>

      <div className='flex items-center justify-center gap-2'>
        <Button
          className='h-7'
          variant='ghost'
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          <ChevronLeftIcon className='mr-1 h-4 w-4 md:h-6 md:w-6' /> Previous
        </Button>
        <div className='flex-center'>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              className='aspect-square h-12 w-12 rounded-full'
              key={i + 1}
              variant={page === i + 1 ? 'default' : 'ghost'}
              onClick={() => goToPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
        </div>

        <Button
          variant='ghost'
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          Next <ChevronRightIcon className='ml-1 h-4 w-4 md:h-6 md:w-6' />
        </Button>
      </div>
    </div>
  );
};
