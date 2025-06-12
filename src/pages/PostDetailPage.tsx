import { useParams } from 'react-router-dom';
import { usePostDetail } from '@/utils/hooks/usePosts';
import { Skeleton } from '@/components/ui/skeleton';
import PostInteractions from '@/components/common/PostInteractions';
import PostAuthor from '@/components/common/PostAuthor';
import PostTag from '@/components/common/PostTag';
import { Separator } from '@radix-ui/react-separator';
import { API_BASE_URL } from '@/utils/apis/axios-with-config';
import { useUser } from '@/utils/hooks/useUser';
import CommentSection from '@/components/common/comments/CommentSection';
import { useRecommendedPosts } from '@/utils/hooks/usePosts';
import { useAuthors } from '@/utils/hooks/useAuthors';
import { PostCard } from '@/components/common/PostCard';

const PostDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, isLoading, isError } = usePostDetail(id || '');
  const { data: author } = useUser(post?.author.email || '');

  const page = 1;
  const limit = 1;

  const { data } = useRecommendedPosts(page, limit);
  const emails = data?.data.map((post) => post.author.email) || [];
  const { authors } = useAuthors(emails);

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
    <>
      <article className='mx-auto flex w-full max-w-200 flex-col gap-4 md:w-200'>
        <h1 className='text-display-lg font-bold'>{post.title}</h1>

        <div className='flex gap-2'>
          {post.tags.map((tag) => (
            <PostTag key={tag} tag={tag} />
          ))}
        </div>
        <PostAuthor
          name={post.author.name}
          avatar={`${API_BASE_URL}${author?.avatarUrl}`}
          date={post.createdAt}
        />

        <div className='w-full bg-neutral-300'>
          <Separator className='h-px' />
        </div>

        <PostInteractions likes={post.likes} comments={post.comments} />

        <div className='w-full bg-neutral-300'>
          <Separator className='h-px' />
        </div>
        <div className='mb-6 w-full overflow-hidden rounded-sm bg-neutral-700'>
          <img
            src={post.imageUrl}
            alt={post.title}
            className='h-151.75 w-full object-cover'
          />
        </div>
        <div className='text-body leading-relaxed whitespace-pre-line'>
          {post.content}
        </div>

        <CommentSection postId={post.id.toString()} />

        <div className='flex flex-col gap-4 border-t border-neutral-300 pt-4'>
          <h2 className='md:text-display-xs mb-2 text-xl font-bold'>
            Another Post
          </h2>
          <div className='md:pb-58'>
            {data?.data.map((post) => {
              const avatarUrl = authors[post.author.email]?.avatarUrl;
              const avatar = avatarUrl ? `${API_BASE_URL}${avatarUrl}` : '';
              return (
                <PostCard
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
        </div>
      </article>
    </>
  );
};

export default PostDetailPage;
