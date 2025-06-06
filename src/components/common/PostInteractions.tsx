import React from 'react';
import LikeIcon from '@/assets/icons/like.svg';
import CommentIcon from '@/assets/icons/comment.svg';

interface PostInteractionsProps {
  likes: number;
  comments: number;
}

const PostInteractions: React.FC<PostInteractionsProps> = ({
  likes,
  comments,
}) => {
  return (
    <>
      <div className='flex items-center gap-4 text-xs text-neutral-600 md:text-sm'>
        <div className='flex items-center gap-1.5 text-neutral-600'>
          <LikeIcon />
          <span>{likes}</span>
        </div>
        <div className='flex items-center gap-1.5'>
          <CommentIcon />
          <span>{comments}</span>
        </div>
      </div>
    </>
  );
};

export default PostInteractions;
