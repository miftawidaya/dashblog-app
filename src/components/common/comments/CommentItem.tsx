// components/comments/CommentItem.tsx
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';

type Props = {
  name: string;
  avatar: string;
  content: string;
  createdAt: string;
};

export default function CommentItem({
  name,
  avatar,
  content,
  createdAt,
}: Props) {
  return (
    <div className='border-muted flex gap-3 border-b py-4'>
      <Avatar>
        <AvatarImage src={avatar} alt={name} />
      </Avatar>
      <div className='flex flex-col gap-1'>
        <div className='text-sm font-medium'>{name}</div>
        <div className='text-muted-foreground text-xs'>
          {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
        </div>
        <p className='mt-1 text-sm'>{content}</p>
      </div>
    </div>
  );
}
