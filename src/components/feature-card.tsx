import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardTitle: string;
  Icon: LucideIcon;
}

const FeatureCard = ({
  cardTitle,
  Icon,
  children,
  ...props
}: FeatureCardProps) => {
  return (
    <Card {...props}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{cardTitle}</CardTitle>
        <Icon className='w-4 h-4 text-muted-foreground' />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default FeatureCard;
