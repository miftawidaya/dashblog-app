// components/common/comments/CommentList.tsx
import CommentItem from './CommentItem';
import { useComments } from '@/utils/hooks/useComments';

type Props = { postId: string; limit?: number };

export default function CommentList({ postId, limit = 3 }: Props) {
  const { data, isLoading } = useComments(postId);

  if (isLoading) return <p>Loading comments...</p>;

  const shownComments = data?.slice(0, limit);

  return (
    <div>
      {shownComments?.map((comment) => (
        <CommentItem
          key={comment.id}
          name={comment.author.name}
          avatar={comment.author.avatarUrl ?? '/assets/avatar.jpg'}
          content={comment.content}
          createdAt={comment.createdAt}
        />
      ))}
    </div>
  );
}
