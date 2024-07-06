import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchModuleById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import HistoricalChart from '@/components/historical-data-chart';
import ErrorCard from '@/components/error-card';

const ModuleDetails = () => {
  const { id } = useParams();

  const {
    data: moduleData,
    isLoading: isModuleDataLoading,
    error: moduleDataError,
  } = useQuery({
    queryKey: ['module', id],
    queryFn: () => fetchModuleById(id!),
  });

  if (isModuleDataLoading) return <div>Loading...</div>;

  if (moduleDataError) return <div>Error: {moduleDataError.message}</div>;

  return (
    <div className='max-w-6xl mx-auto py-10'>
      <Card>
        <CardHeader>
          <CardTitle>{moduleData?.name}</CardTitle>
          <CardDescription>{moduleData?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <HistoricalChart moduleId={id!} />
        </CardContent>
        <CardFooter>
          <Button disabled={!moduleData?.available}>
            <Edit className='mr-2 h-4 w-4' /> Edit Module
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ModuleDetails;
