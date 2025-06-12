// components/comments/CommentForm.tsx
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAddComment } from '@/utils/hooks/useComments';
import { Textarea } from '@/components/ui/textarea';

type Props = { postId: string };

export default function CommentForm({ postId }: Props) {
  const [value, setValue] = useState('');
  const { mutate, isPending } = useAddComment(postId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    mutate(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-end gap-3'>
      <Textarea
        placeholder='Enter your comment'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='h-35'
      />
      <Button type='submit' disabled={isPending} className='w-full md:w-52'>
        Send
      </Button>
    </form>
  );
}
