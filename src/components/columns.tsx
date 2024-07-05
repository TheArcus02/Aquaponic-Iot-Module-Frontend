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
  },
  {
    accessorKey: 'targetTemperature',
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title='Target Temperature' />
      );
    },
  },
];
