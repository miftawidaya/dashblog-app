import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='h-15 w-full border-t border-neutral-300 bg-white md:h-20'>
      <div className='custom-container flex-center h-full text-xs text-neutral-600 md:text-sm'>
        &copy; {new Date().getFullYear()} Web Programming Hack Blog All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
