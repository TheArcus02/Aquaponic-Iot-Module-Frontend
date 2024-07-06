import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ArrowLeft, RefreshCcw, ServerCrash } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const ErrorCard = ({
  error,
  action,
}: {
  error: Error;
  action?: () => void;
}) => {
  return (
    <Card className='max-w-xl min-w-96'>
      <CardHeader>
        <CardTitle className='flex space-x-2 items-center'>
          <ServerCrash className='w-4 h-4' /> <span>Error occured</span>
        </CardTitle>
        <CardDescription>{error.message}</CardDescription>
      </CardHeader>
      <CardFooter className='space-x-2'>
        <Link to='/'>
          <Button variant='default'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Go to Home
          </Button>
        </Link>
        {action && (
          <Button variant='destructive' onClick={() => action()}>
            <RefreshCcw className='w-4 h-4 mr-2' />
            Retry
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
