import React, { useState } from 'react';
import { PostCard } from '@/components/common/PostCard';
import { Button } from '@/components/ui/button';
import { useRecommendedPosts } from '@/utils/hooks/usePosts';
import { Skeleton } from '../ui/skeleton';

export const RecommendedPostList: React.FC = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isLoading, isError } = useRecommendedPosts(page, limit);

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
      <div className='flex flex-col space-y-4'>
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
      <div className='flex flex-col space-y-4 border-b pb-4'>
        {data.data.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            thumbnail={post.imageUrl}
            title={post.title}
            tags={post.tags}
            summary={post.content.slice(0, 150)}
            author={{ name: post.author.name, avatar: '' }} // avatar belum tersedia di schema
            date={new Date(post.createdAt).toLocaleDateString()}
            likes={post.likes}
            comments={post.comments}
          />
        ))}
      </div>

      <div className='mt-4 flex items-center justify-center gap-2'>
        <Button
          variant='outline'
          size='default'
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          ← Previous
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={page === i + 1 ? 'default' : 'outline'}
            size='default'
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant='outline'
          size='default'
          onClick={() => goToPage(page + 1)}
          disabled={page === totalPages}
        >
          Next →
        </Button>
      </div>
    </div>
  );
};
