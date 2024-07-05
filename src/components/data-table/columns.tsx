import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';

export const columns: ColumnDef<IModule>[] = [
  {
    id: 'index',
    header: '#',
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Name' />;
    },
  },
  {
    accessorKey: 'available',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Available' />;
    },
    cell: (info) => (info.getValue() ? 'Yes' : 'No'),
  },
  {
    accessorKey: 'targetTemperature',
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title='Target Temperature' />
      );
    },
  },
  {
    accessorKey: 'temperature',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='Temperature' />;
    },
    cell: (info) => {
      const currentTemp = info.getValue() as Pick<IModule, 'temperature'>;
      if (currentTemp === undefined)
        return <span className='text-muted-foreground'>N/A</span>;

      const targetTemp = info.row.original.targetTemperature;
      const diff = Math.abs((currentTemp as number) - targetTemp);
      const color = diff > 0.5 ? 'text-destructive' : 'text-green-500';

      return <span className={color}>{String(currentTemp)}°C</span>;
    },
  },
];
