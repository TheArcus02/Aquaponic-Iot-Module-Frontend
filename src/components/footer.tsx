import { Link } from 'react-router-dom';
import { Separator } from './ui/separator';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';
import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <Separator />
      <footer className='py-3 px-10 flex items-center justify-between'>
        <Link
          className={cn(
            'py-6',
            buttonVariants({ variant: 'ghost', size: 'icon' })
          )}
          to='https://github.com/TheArcus02/Aquaponic-Iot-Module-API'
          target='_blank'
        >
          <Github className='h-6 w-6' />
        </Link>
        <p className='text-muted-foreground text-sm mx-auto'>
          &copy; {new Date().getFullYear()} Luna Scientific. All rights
          reserved.
        </p>
      </footer>
    </>
  );
};

export default Footer;
