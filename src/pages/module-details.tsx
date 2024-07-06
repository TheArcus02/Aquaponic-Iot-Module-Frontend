import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { fetchModuleById } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AreaChart, ArrowLeft, Edit, Thermometer } from 'lucide-react';
import HistoricalChart from '@/components/historical-data-chart';
import ErrorCard from '@/components/error-card';
import Loader from '@/components/loader';
import FeatureCard from '@/components/feature-card';
import { useReactQuerySubscription } from '@/hooks/use-react-query-subscription';
import { Badge } from '@/components/ui/badge';
import ModuleEditDialog from '@/components/module-edit-dialog';

const CurrentTempCardContent = ({ data }: { data: IModule }) => {
  if (data?.temperature === undefined)
    return <div className='text-muted-foreground text-2xl text-bold'>N/A</div>;

  const temperatureDifference = Math.abs(
    data.temperature! - data.targetTemperature
  );
  const temperatureClass =
    temperatureDifference <= 0.5 ? 'text-green-500' : 'text-destructive';

  return (
    <div className='text-2xl font-bold'>
      <span className={temperatureClass}>{data.temperature}°C</span>
      <span className='text-sm text-muted-foreground'>
        {' '}
        (±{temperatureDifference.toFixed(2)}°)
      </span>
    </div>
  );
};

const ModuleDetails = () => {
  const { id } = useParams();

  const {
    data: module,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['module', id],
    queryFn: () => fetchModuleById(id!),
  });

  useReactQuerySubscription();

  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  if (error)
    return (
      <div className='flex items-center justify-center'>
        <ErrorCard error={error} action={refetch} />
      </div>
    );

  return (
    <div className='max-w-6xl mx-auto py-10'>
      <Button variant='ghost' onClick={() => navigate(-1)} className='mb-2'>
        <ArrowLeft className='mr-2 h-4 w-4' />
        Back
      </Button>

      <Card>
        <CardHeader>
          <div className='flex flex-col space-y-4 md:flex-row items-center justify-between md:space-y-0'>
            <CardTitle className='flex items-center'>
              {module?.name}
              {!module?.available ? (
                <Badge className='ml-2' variant='destructive'>
                  Not available
                </Badge>
              ) : (
                <Badge className='ml-2'>Avaliable</Badge>
              )}
            </CardTitle>
            <ModuleEditDialog
              id={module?.id!}
              name={module?.name}
              description={module?.description}
              targetTemperature={module?.targetTemperature}
            >
              <Button
                disabled={!module?.available}
                size='sm'
                className='w-full md:w-max'
              >
                <Edit className='mr-2 h-4 w-4' /> Edit Module
              </Button>
            </ModuleEditDialog>
          </div>
          <CardDescription className='max-w-3xl'>
            {module?.description}
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='flex space-x-4'>
            <FeatureCard
              cardTitle='Target Temperature'
              Icon={Thermometer}
              className='flex-grow'
            >
              <div className='text-2xl font-bold'>
                {module?.targetTemperature}°C
              </div>
            </FeatureCard>
            <FeatureCard
              cardTitle='Current Temperature'
              Icon={Thermometer}
              className='flex-grow'
            >
              <CurrentTempCardContent data={module!} />
            </FeatureCard>
          </div>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0'>
              <CardTitle>Historical Temperature Data</CardTitle>
              <AreaChart className='w-4 h-4 mr-2 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <HistoricalChart moduleId={id!} />
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModuleDetails;
