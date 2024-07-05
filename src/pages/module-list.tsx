import { columns } from '@/components/columns';
import { DataTable } from '@/components/data-table';

function getData(): IModule[] {
  return [
    {
      id: '1',
      name: 'Module 1',
      description: 'Module 1 description',
      available: true,
      targetTemperature: 20,
    },
    {
      id: '2',
      name: 'Module 2',
      description: 'Module 2 description',
      available: false,
      targetTemperature: 20,
    },
    {
      id: '3',
      name: 'Module 3',
      description: 'Module 3 description',
      available: true,
      targetTemperature: 20,
    },
  ];
}

const ModuleList = () => {
  const data = getData();

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ModuleList;
