import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRef, useState } from 'react';
import { BarLoader, BeatLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { Input } from '../ui/input';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  status?: 'pending' | 'error' | 'success';
  error?: Error;
  isFetching: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  status,
  error,
  isFetching,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const tableRef = useRef<HTMLTableElement>(null);
  const navigate = useNavigate();

  return (
    <div>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Search...'
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
      </div>
      <div className='rounded-md border'>
        <Table ref={tableRef}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {status === 'pending' ? (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24'>
                  <div className='flex h-full items-center justify-center'>
                    <BeatLoader color='#94A3B8' />
                  </div>
                </TableCell>
              </TableRow>
            ) : status === 'error' ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center text-muted-foreground'
                >
                  Error fetching data.
                  <p>{error?.message && ` ${error.message}`}</p>
                </TableCell>
              </TableRow>
            ) : (
              <>
                {isFetching && (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='p-0'>
                      <BarLoader
                        width={tableRef.current?.offsetWidth || 0}
                        color='#94A3B8'
                      />
                    </TableCell>
                  </TableRow>
                )}
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      onClick={() =>
                        navigate(`/modules/${(row.original as IModule).id}`)
                      }
                      className='cursor-pointer'
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className='h-24 text-center'
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
