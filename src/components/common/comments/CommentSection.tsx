// components/comments/CommentSection.tsx
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useComments } from '@/utils/hooks/useComments';

type Props = { postId: string };

export default function CommentSection({ postId }: Props) {
  const [showAll, setShowAll] = useState(false);
  const { data: comments, isLoading } = useComments(postId);

  const totalComments = comments?.length ?? 0;

  return (
    <section className='flex flex-col gap-3 border-t border-neutral-300 py-3 md:py-4'>
      <h2 className='md:text-display-xs mb-2 text-xl font-bold'>
        Comments ({isLoading ? '...' : totalComments})
      </h2>
      <h3 className='text-sm font-semibold'>Give your Comments</h3>
      <CommentForm postId={postId} />

      <CommentList postId={postId} limit={showAll ? 1000 : 3} />

      {!showAll && totalComments > 3 && (
        <Button
          variant='link'
          className='mt-2 h-auto p-0 text-sm'
          onClick={() => setShowAll(true)}
        >
          See All Comments
        </Button>
      )}
    </section>
  );
}
