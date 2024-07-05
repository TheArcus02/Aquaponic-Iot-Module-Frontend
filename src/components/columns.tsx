import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';

export const columns: ColumnDef<IModule>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title='#' />;
    },
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
