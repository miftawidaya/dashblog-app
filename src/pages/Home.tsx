import React from 'react';
import { RecommendedPostList } from '@/components/common/RecommendedPostList';
import { MostLikedPostList } from '@/components/common/MostLikedPostList';
import { Separator } from '@radix-ui/react-separator';

const Home: React.FC = () => {
  return (
    <div className='flex flex-col gap-12 pb-38 xl:flex-row'>
      <div className='flex-grow basis-0'>
        <h3 className='md:text-display-sm mb-4 text-xl font-bold md:mb-8'>
          Recommend For You
        </h3>
        <RecommendedPostList />
      </div>
      <div className='mb-14 hidden w-px self-stretch bg-neutral-300 xl:block'>
        <Separator orientation='vertical' />
      </div>
      <div className='w-74.25 shrink-0'>
        <h3 className='md:text-display-sm mb-4 text-xl font-bold'>
          Most Liked
        </h3>
        <MostLikedPostList />
      </div>
    </div>
  );
};

export default Home;
