import { useParams } from 'react-router-dom';
import { usePostDetail } from '@/utils/hooks/usePosts';
import { Skeleton } from '@/components/ui/skeleton';

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
    <article className='prose mx-auto'>
      <img
        src={post.imageUrl}
        alt={post.title}
        className='mb-6 w-full rounded-xl'
      />
      <h1>{post.title}</h1>
      <p className='text-muted-foreground mb-2 text-sm'>
        {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className='mb-4 flex gap-2'>
        {post.tags.map((tag) => (
          <span
            key={tag}
            className='bg-muted text-muted-foreground rounded px-2 py-1 text-xs font-medium'
          >
            #{tag}
          </span>
        ))}
      </div>
      <div className='text-base leading-relaxed whitespace-pre-line'>
        {post.content}
      </div>
      <div className='text-muted-foreground mt-8 flex gap-4 text-sm'>
        <div>👍 {post.likes} Likes</div>
        <div>💬 {post.comments} Comments</div>
      </div>
    </article>
  );
};

export default PostDetailPage;
