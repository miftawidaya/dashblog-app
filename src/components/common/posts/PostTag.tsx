import React from 'react';

const PostTag: React.FC<{ tag: string }> = ({ tag }) => {
  return (
    <span className='flex-center h-7 rounded-md border border-neutral-300 px-2 text-xs'>
      {tag}
    </span>
  );
};

export default PostTag;
