import React from 'react';
import ReactLogo from '@/assets/react.svg';

const Home: React.FC = () => {
  return (
    <div className='custom-container flex flex-wrap items-center gap-7 overflow-hidden pt-28'>
      <div className='flex flex-[7.7] basis-85 flex-col gap-4'>
        <h1 className='text-display-2xl font-bold'>DashBlog</h1>
        <p className='text-display-md font-semibold'>
          An open-source React blog app to create, edit, and manage posts with a
          built-in dashboard.
        </p>
      </div>
      <div className='flex-[2.3] basis-85 p-20'>
        <a
          href='https://github.com/miftawidaya/dashblog-app'
          target='_blank'
          rel='noreferrer'
        >
          <ReactLogo className='h-full w-full object-cover' />
        </a>
      </div>
    </div>
  );
};

export default Home;
