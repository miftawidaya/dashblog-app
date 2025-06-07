// src/components/home/MostLikedPostList.tsx
import React from 'react';
import { useMostLikedPosts } from '@/utils/hooks/usePosts';
import { PostCard } from '@/components/common/PostCard';
import { Skeleton } from '../ui/skeleton';
import { API_BASE_URL } from '@/utils/apis/axios-with-config';
import { useAuthors } from '@/utils/hooks/useAuthors';

export const MostLikedPostList: React.FC = () => {
  const { data, isLoading, isError } = useMostLikedPosts();

  const emails = data?.data.map((post) => post.author.email) || [];
  const { authors, isLoading: authorLoading } = useAuthors(emails);

  //   if (isLoading) return <p className="text-muted-foreground">Loading most liked posts...</p>;
  if (isError || !data)
    return <p className='text-red-500'>Failed to load most liked posts.</p>;

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-8 w-3/4' />
        <Skeleton className='h-96 w-full' />
        <Skeleton className='h-6 w-1/2' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4 md:gap-5'>
      {data.data.slice(0, 3).map((post) => {
        const avatarUrl = authors[post.author.email]?.avatarUrl;
        const avatar = avatarUrl ? `${API_BASE_URL}${avatarUrl}` : '';
        return (
          <PostCard
            className='last:border-b-0 md:border-b md:border-neutral-300 md:pb-4'
            key={post.id}
            id={post.id}
            thumbnail={post.imageUrl}
            title={post.title}
            tags={post.tags}
            summary={post.content.slice(0, 100)}
            author={{
              name: authors[post.author.email]?.name,
              avatar: avatar,
            }}
            date={new Date(post.createdAt).toLocaleDateString()}
            likes={post.likes}
            comments={post.comments}
            compact
          />
        );
      })}
    </div>
  );
};
