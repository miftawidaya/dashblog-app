// src/components/home/MostLikedPostList.tsx
import React from 'react';
import { useMostLikedPosts } from '@/utils/hooks/usePosts';
import { PostCard } from '@/components/common/PostCard';
import { Skeleton } from '../ui/skeleton';

export const MostLikedPostList: React.FC = () => {
  const { data, isLoading, isError } = useMostLikedPosts();

//   if (isLoading) return <p className="text-muted-foreground">Loading most liked posts...</p>;
  if (isError || !data) return <p className="text-red-500">Failed to load most liked posts.</p>;


  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-96 w-full" />
        <Skeleton className="h-6 w-1/2" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.data.slice(0, 3).map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          thumbnail={post.imageUrl}
          title={post.title}
          tags={post.tags}
          summary={post.content.slice(0, 100)}
          author={{ name: post.author.name, avatar: '' }}
          date={new Date(post.createdAt).toLocaleDateString()}
          likes={post.likes}
          comments={post.comments}
          compact
        />
      ))}
    </div>
  );
};
