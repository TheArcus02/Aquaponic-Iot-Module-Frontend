import * as React from 'react';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { ServerCrash } from 'lucide-react';
import { Button } from './ui/button';

const ErrorCard = ({
  error,
  action,
}: {
  error: Error;
  action?: () => void;
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex space-x-2 items-center'>
          <ServerCrash className='w-4 h-4' /> <span>Error occured</span>
        </CardTitle>
        <CardDescription>{error.message}</CardDescription>
      </CardHeader>
      {action && (
        <CardFooter>
          <Button variant='destructive' onClick={() => action()}>
            Retry
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ErrorCard;
