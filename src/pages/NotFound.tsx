import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => (
  <div className='flex h-full items-center justify-center'>
    <h1 className='text-2xl font-bold'>404 - Page Not Found</h1>
    <Link to='/'>Go Home</Link>
  </div>
);

export default NotFound;
