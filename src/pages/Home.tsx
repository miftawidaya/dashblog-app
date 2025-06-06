import React from 'react';
import { RecommendedPostList } from '@/components/common/RecommendedPostList';
import { MostLikedPostList } from '@/components/common/MostLikedPostList';
import { Separator } from '@radix-ui/react-separator';

const Home: React.FC = () => {
  return (
    <div className='flex flex-col gap-6 lg:flex-row'>
      <div className='flex-grow basis-0'>
        <h3 className='w-74.25 text-lg font-semibold'>Recommend For You</h3>
        <RecommendedPostList />
      </div>
      <div className='hidden w-px self-stretch bg-neutral-300 lg:block'>
        <Separator orientation='vertical' />
      </div>
      <div className='w-74.25 shrink-0'>
        <h3 className='text-lg font-semibold'>Most Liked</h3>
        <MostLikedPostList />
      </div>
    </div>
  );
};

export default Home;
