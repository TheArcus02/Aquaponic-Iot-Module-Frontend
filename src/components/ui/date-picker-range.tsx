import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';

export function DatePickerWithRange({
  dateRange,
  setDateRange,
  className,
}: {
  dateRange: DateRange | undefined;
  setDateRange: (range: DateRange | undefined) => void;
  className?: string;
}) {
  const [startTime, setStartTime] = React.useState('00:00');
  const [endTime, setEndTime] = React.useState('23:59');

  const handleDateChange = (range: DateRange | undefined) => {
    if (range) {
      const from = range.from
        ? new Date(
            range.from.setHours(
              parseInt(startTime.split(':')[0]),
              parseInt(startTime.split(':')[1])
            )
          )
        : undefined;
      const to = range.to
        ? new Date(
            range.to.setHours(
              parseInt(endTime.split(':')[0]),
              parseInt(endTime.split(':')[1])
            )
          )
        : undefined;
      setDateRange({ from, to });
    } else {
      setDateRange(undefined);
    }
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !dateRange && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, 'LLL dd, y')} -{' '}
                  {format(dateRange.to, 'LLL dd, y')}
                </>
              ) : (
                format(dateRange.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
          <div className='p-2 flex space-x-2'>
            <label className='flex-grow'>
              Start Time:
              <Input
                type='time'
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </label>
            <label className='flex-grow'>
              End Time:
              <Input
                type='time'
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </label>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
