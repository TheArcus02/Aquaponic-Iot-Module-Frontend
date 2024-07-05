import { columns } from '@/components/data-table/columns';
import { DataTable } from '@/components/data-table/data-table';
import { useReactQuerySubscription } from '@/hooks/use-react-query-subscription';
import { fetchModules } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const ModuleList = () => {
  const { data, status, error, isFetching } = useQuery({
    queryKey: ['modules'],
    queryFn: fetchModules,
  });

  useReactQuerySubscription();

  return (
    <div className='h-full flex flex-col space-y-4 p-8 container mx-auto'>
      <div>
        <h2 className='text-2xl font-bold tracking-tight'>Welcome back!</h2>
        <p className='text-muted-foreground'>
          Here are the modules you have access to.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={data || []}
        error={error || undefined}
        isFetching={isFetching}
        status={status}
      />
    </div>
  );
};

export default ModuleList;
