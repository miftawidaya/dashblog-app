import { useParams } from 'react-router-dom';
import { usePostDetail } from '@/utils/hooks/usePosts';
import { Skeleton } from '@/components/ui/skeleton';
import PostInteractions from '@/components/common/PostInteractions';
import PostAuthor from '@/components/common/PostAuthor';
import PostTag from '@/components/common/PostTag';
import { Separator } from '@radix-ui/react-separator';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError } = usePostDetail(id || '');

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <Skeleton className='h-8 w-3/4' />
        <Skeleton className='h-96 w-full' />
        <Skeleton className='h-6 w-1/2' />
      </div>
    );
  }

  if (isError || !post) {
    return <p className='text-red-500'>Failed to load post.</p>;
  }

  return (
    <article className='mx-auto flex flex-col gap-4 md:max-w-200'>
      <h1 className='text-display-lg font-bold'>{post.title}</h1>

      <div className='flex gap-2'>
        {post.tags.map((tag) => (
          <PostTag key={tag} tag={tag} />
        ))}
      </div>
      <PostAuthor
        name={post.author.name}
        avatar={post.author.avatarUrl || ''}
        date={post.createdAt}
      />

      <div className='w-full bg-neutral-300'>
        <Separator className='h-px' />
      </div>

      <PostInteractions likes={post.likes} comments={post.comments} />

      <div className='w-full bg-neutral-300'>
        <Separator className='h-px' />
      </div>

      <img
        src={post.imageUrl}
        alt={post.title}
        className='mb-6 w-full rounded-xl'
      />

      <div className='text-body leading-relaxed whitespace-pre-line'>
        {post.content}
      </div>
    </article>
  );
};

export default PostDetailPage;
