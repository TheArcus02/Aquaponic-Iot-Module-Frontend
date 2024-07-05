import { columns } from '@/components/columns';
import { DataTable } from '@/components/data-table';
import { fetchModules } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

const ModuleList = () => {
  const { data, status, error, isFetching } = useQuery({
    queryKey: ['modules'],
    queryFn: fetchModules,
  });

  return (
    <div className='container mx-auto py-10'>
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
