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

const ModuleDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ['module', id],
    queryFn: () => fetchModuleById(id!),
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className='max-w-xl mx-auto py-10'>
      <Card>
        <CardHeader>
          <CardTitle>{data?.name}</CardTitle>
          <CardDescription>{data?.description}</CardDescription>
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum
          iure, itaque repellendus numquam reiciendis repudiandae corrupti
          debitis provident molestias accusantium quas earum hic aspernatur
          assumenda asperiores, animi laborum officiis consectetur.
        </CardContent>
        <CardFooter>
          <Button disabled={!data?.available}>
            <Edit className='mr-2 h-4 w-4' /> Edit Module
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ModuleDetails;
