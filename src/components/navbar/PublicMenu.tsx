import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';

export default function PublicMenu() {
  return (
    <>
      <Link
        to='/auth/login'
        className='text-primary-300 hover:text-primary-300/80 font-semibold underline underline-offset-4'
      >
        Login
      </Link>
      <div className='h-6 bg-neutral-300'>
        <Separator orientation='vertical' />
      </div>
      <Button variant='default' className='h-11 w-45.5' asChild>
        <Link to='/auth/register'>Register</Link>
      </Button>
    </>
  );
}
