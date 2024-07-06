import { fetchModuleHistory } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { DatePickerWithRange } from './ui/date-picker-range';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { PropagateLoader } from 'react-spinners';
import ErrorCard from './error-card';

const HistoricalChart = ({ moduleId }: { moduleId: string }) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date('2024-05-01T00:00:00.000Z'),
    to: new Date('2024-06-02T00:00:00.000Z'),
  });
  const [mode, setMode] = React.useState<'hourly' | 'daily'>('daily');

  const start = dateRange?.from?.toISOString() ?? '';
  const stop = dateRange?.to?.toISOString() ?? '';

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['module-history', moduleId, start, stop, mode],
    queryFn: () => fetchModuleHistory(moduleId!, start, stop, mode),
    enabled: !!moduleId && !!start && !!stop && !!mode,
  });

  const formatXAxis = (timestamp: string) => {
    return format(parseISO(timestamp), 'MM/dd/yyyy HH:mm');
  };

  const getYAxisDomain = () => {
    const temperatures = data?.map((d) => d.temperature) || [];
    const min = Math.min(...temperatures);
    const max = Math.max(...temperatures);
    return [Math.floor(min - 1), Math.ceil(max + 1)];
  };

  if (isLoading)
    return (
      <div className='flex items-center justify-center h-96'>
        <PropagateLoader color='#22B357' />
      </div>
    );

  if (error) {
    return <ErrorCard error={error} action={refetch} />;
  }

  return (
    <div className='space-y-4'>
      <div className='flex justify-between'>
        <DatePickerWithRange
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        <Select
          value={mode}
          onValueChange={(value) => setMode(value as 'hourly' | 'daily')}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select mode' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Modes</SelectLabel>
              <SelectItem value='hourly'>Hourly</SelectItem>
              <SelectItem value='daily'>Daily</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart data={data}>
          {/* <CartesianGrid strokeDasharray='3 3' /> */}
          <XAxis dataKey='timestamp' tickFormatter={formatXAxis} />
          <YAxis domain={getYAxisDomain()} />
          <Tooltip
            labelFormatter={(label) =>
              format(new Date(label), 'MM/dd/yyyy HH:mm')
            }
            content={({ active, payload, label }) => {
              if (active && payload && payload.length && label) {
                return (
                  <div className='rounded-lg border bg-background p-2 shadow-sm'>
                    <div className='grid grid-cols-2 gap-2'>
                      <div className='flex flex-col'>
                        <span className='text-[0.70rem] uppercase text-muted-foreground'>
                          Date
                        </span>
                        <span className='font-bold text-muted-foreground'>
                          {format(parseISO(label), 'MM/dd/yyyy HH:mm')}
                        </span>
                      </div>
                      <div className='flex flex-col'>
                        <span className='text-[0.70rem] uppercase text-muted-foreground'>
                          Temperature
                        </span>
                        <span className='font-bold'>{payload[0].value}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              return null;
            }}
          />
          <Legend />
          <Line
            type='monotone'
            dataKey='temperature'
            stroke='#22B357'
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoricalChart;
